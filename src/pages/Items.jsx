import MainTemplate from "../template/MainTemplate";
import { Breadcrumbs, Typography, DialogContent, DialogActions, Grid, Alert } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid'
import { useState, useEffect } from "react";
import { findLike, persist, findByKey, findByAttribute, deleteByKey } from "../service/utils";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import SearchBar from "../components/SearchBar";
import LoadingButton from "../components/LoadingButton";
import HeadInfo from "../components/HeadInfo";
import FormDialog from "../components/FormDialog";
import { collections } from "../service/collections";


export default function Items() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [entity, setEntity] = useState(createNewEntity());

  useEffect(() => {
    fetch();
  }, []);

  function fetch() {
    findLike(collections.items, 'name', search).then((data) =>{
      setData(data);
    });
  }

  function createNewEntity() {
    return { id: null, name: '' };
  }

  function newEntity() {
    setEntity(createNewEntity());
    setOpen(true);
  };

  async function handleEdit(params) {
    const dbObj = await findByKey(collections.items, params.id);
    if (dbObj != null) {
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
    const valid = await validate(entity);
    if (valid) {
      try {
        await persist(collections.items, entity);
        fetch();
        setOpen(false);
      } catch (e) {
        setError(e.message);
      }
    }
    setLoading(false);
  }

  async function validate(entity) {
    const similar = await findByAttribute(collections.items, 'name', '==', entity.name);
    if (similar.length > 0 && ((entity.id == null) || (similar[0].id != entity.id))) {
      setError('Já existe um item com esse nome');
      return false;
    }
    return true;
  }

  async function remove() {
    setLoading(true);
    try {
      await deleteByKey(collections.items, entity.id);
      fetch();
      setOpen(false);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  function handleSubmit(e){
    e.preventDefault();
    fetch();
  }


  return (
    <MainTemplate>
      <HeadInfo>
        <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
          <Typography color="text.primary">Itens</Typography>
        </Breadcrumbs>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} onSubmit={handleSubmit}  />
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
              <Grid item xs={12} >
                <RoundedInput
                  label="Nome"
                  name="name"
                  value={entity.name}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  required
                />

              </Grid>
            </Grid>
            <Alert severity="error" style={{ marginTop: "5px", display: error === '' ? "none" : "" }} >{error}</Alert>
          </DialogContent>
          <DialogActions>
            <LoadingButton isLoading={loading} color="error" onClick={remove}>Excluir</LoadingButton>
            <LoadingButton isLoading={loading} onClick={handleClose}>Voltar</LoadingButton>
            <LoadingButton isLoading={loading} type="submit" variant='contained' >Salvar</LoadingButton>
          </DialogActions>
        </form>
      </FormDialog>
    </MainTemplate>);

}


const columns = [
  {
    field: 'name',
    headerName: 'Nome',
    flex: 1,
    minWidth: 200
  },
];