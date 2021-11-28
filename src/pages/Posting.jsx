import MainTemplate from "../template/MainTemplate";
import { Breadcrumbs, Typography, DialogContent, DialogActions, Grid, Alert } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid'
import { useState, useEffect } from "react";
import { findAll, persist, findByKey, deleteByKey, findLike } from "../service/utils";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import SearchBar from "../components/SearchBar";
import LoadingButton from "../components/LoadingButton";
import ComboBox from "../components/ComboBox";
import HeadInfo from "../components/HeadInfo";
import FormDialog from "../components/FormDialog";
import { collections } from "../service/collections";


export default function Posting() {
  const [data, setData] = useState([]);
  const [itens, setItens] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [entity, setEntity] = useState(createNewEntity());
  const [qty, setQty] = useState('1,0');
  const [item, setItem] = useState(newItem());

  useEffect(() => {
    setSearch('');
    fetch();
  }, []);

  function fetch() {
    let itemList = [];
    findLike(collections.items, 'name', search).then((data) => {
      itemList = data;
      setItens(data);
    });
    findAll(collections.posting).then((data) => {
      const list = [];
      data.forEach((it) => {
        for (let i = 0; i < itemList.length; i++) {
          let it2 = itemList[i];
          if (it2.id == it.itemId) {
            it.item = it2;
            list.push(it);
          }
        }
      });
      list.sort(function(a, b){
        const aDate = Date.parse(a.date);
        const bDate = Date.parse(b.date);
        if(aDate > bDate){
          return -1;
        }else if(aDate < bDate){
          return 1;
        }
        return 0;
      })
      setData(list);
    });
  }

  function createNewEntity() {
    return { id: null, itemId: null, item: null, quantity: 1.0, observation: '', date: new Date().toISOString().substring(0, 10) };
  }

  function newItem() {
    return { id: null, name: '' };
  }

  function newEntity() {
    setEntity(createNewEntity());
    setItem(newItem());
    setQty('1,0');
    setOpen(true);
  };

  async function handleEdit(params) {
    const dbObj = await findByKey(collections.posting, params.id);
    if (dbObj != null) {
      setQty(dbObj.quantity.toString().replace("\.", ","));
      const itemDb = await findByKey(collections.items, dbObj.itemId);
      setItem(itemDb);
      setEntity(dbObj);
      setOpen(true);
    }
  }


  const handleClose = () => {
    setError('');
    setOpen(false);
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setEntity({
      ...entity,
      [evt.target.name]: value
    });
  }

  async function save(e) {
    e.preventDefault();
    setLoading(true);
    if (valida()) {
      ajustFields();
      try {
        await persist(collections.posting, entity);
        fetch();
        setOpen(false);
      } catch (e) {
        setError(e.message);
      }
    }

    setLoading(false);
  }

  function valida() {
    if (item == null) {
      setError("Selecione um item");
      return false;
    }
    if (qty.length == 0) {
      setError("Quantidade Inválida");
      return false;
    }
    if(entity.date == null){
      setError("Informe uma data");
    }
    return true;
  }

  function ajustFields() {
    const obj = entity;
    const value = parseFloat(qty.replace(",", "\."));
    obj.quantity = value;
    obj.itemId = item.id;
    delete obj.item;
    setEntity(obj);
  }

  async function remove() {
    setLoading(true);
    try {
      await deleteByKey(collections.posting, entity.id);
      fetch();
      setOpen(false);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch();
  }


  return (
    <MainTemplate>
      <HeadInfo>
        <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
          <Typography color="text.primary">Lançamentos de Estoque</Typography>
        </Breadcrumbs>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} onSubmit={handleSubmit} />
        <RoundedButton variant='contained' onClick={() => newEntity()}>
          Novo
        </RoundedButton>
      </HeadInfo>
      <DataGrid
        columns={columns}
        autoHeight={true}
        rows={data}
        onRowClick={handleEdit}
      />
      <FormDialog open={open} title='Edição' onClose={() => handleClose()}>
        <form onSubmit={save}>
          <DialogContent >
            <Grid container spacing={1}>
              <Grid item xs={12} md={3}>
                <RoundedInput
                  label="Data"
                  name="date"
                  value={entity.date}
                  onChange={handleChange}
                  variant="outlined"
                  type="date"
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <ComboBox
                  label="Item"
                  value={item}
                  onChange={(e, value) => { e.preventDefault(); setItem(value); }}
                  list={itens}
                />

              </Grid>
              <Grid item xs={12} md={2}>
                <RoundedInput
                  label="Quantidade"
                  name="quantity"
                  sx={{ textAlign: 'right!important' }}
                  value={qty}
                  onChange={(e) => { setQty(e.target.value) }}
                  variant="outlined"
                  size="small"
                  required
                />

              </Grid>
              <Grid item xs={12}>
                <RoundedInput
                  label="Observação"
                  name="observation"
                  sx={{ textAlign: 'right!important' }}
                  value={entity.observation}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  multiline
                  rows='4'
                  maxRows='4'
                />

              </Grid>
            </Grid>
            <Alert severity="error" style={{ marginTop: "5px", display: error === '' ? "none" : "" }} >{error}</Alert>
          </DialogContent>
          <DialogActions>
            {entity.id != null && <LoadingButton isLoading={loading} color="error" onClick={remove}>Excluir</LoadingButton>}
            <LoadingButton isLoading={loading} onClick={handleClose}>Voltar</LoadingButton>
            <LoadingButton isLoading={loading} type="submit" variant='contained' >Salvar</LoadingButton>
          </DialogActions>
        </form>
      </FormDialog>
    </MainTemplate>);

}


const columns = [
  {
    field: 'date',
    headerName: 'Data',
    valueFormatter: (params) =>{
      const date = new Date(Date.parse(params.row?.date));
      return `${date.getDate() + 1 < 10 ? '0'+date.getDate() + 1 : date.getDate() + 1}/${date.getMonth() + 1< 10 ? '0'+date.getMonth()+ 1 : date.getMonth()+ 1}/${date.getFullYear()}`;
    },
    flex: 0.2,
    minWidth: 150
  },
  {
    field: 'item',
    headerName: 'Nome',
    valueFormatter: (params) => params.row?.item.name,
    flex: 0.8,
    minWidth: 200
  },
  {
    field: 'quantity',
    headerName: 'Quantidade',
    valueFormatter: (params) => {
      const qty = params.row?.quantity;
      return qty.toString().replace("\.", ',')
    },
    flex: 0.2,
    minWidth: 150
    
  },
];