import MainTemplate from "../template/MainTemplate";
import { Breadcrumbs, Typography, DialogContent, DialogActions, Grid } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid'
import { useState, useEffect } from "react";
import { findAll, persist, findByKey } from "../service/utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../service/firebase";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import LoadingButton from "../components/LoadingButton";
import HeadInfo from "../components/HeadInfo";
import FormDialog from "../components/FormDialog";
import SelectMenu from "../components/SelectMenu";
import { ADMIN, COMMON } from "../utils/roles";
import { collections } from "../service/collections";


export default function Items() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [entity, setEntity] = useState(createNewEntity());

    useEffect(() => {
        fetch();
    }, []);

    function fetch() {
        findAll(collections.items).then((data) => {
            setData(data);
        });
    }

    function createNewEntity() {
        return { id: null, name: ''};
    }

    function newEntity() {
        setEntity(createNewEntity());
        setOpen(true);
    };

    async function handleEdit(params, event, details) {
        const dbObj = await findByKey(collections.items, params.id);
        if (dbObj != null) {
            setEntity(dbObj);
            setOpen(true);
        }
    }


    const handleClose = () => {
        setOpen(false);
    };

    function handleChange(evt) {
        const value = evt.target.value;
        setEntity({
            ...entity,
            [evt.target.name]: value
        });
    }

    async function save() {
        setLoading(true);
        try {
            await persist(collections.items, entity);
        } catch (e) {
            setOpen(false);
            setLoading(false);
        }
        fetch();
        setOpen(false);
        setLoading(false);
    }

    return (
        <MainTemplate>
            <HeadInfo>
                <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
                    <Typography color="text.primary">Itens</Typography>
                </Breadcrumbs>
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
                <DialogContent >
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6} >
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
                </DialogContent>
                <DialogActions>
                    <LoadingButton isLoading={loading} onClick={handleClose}>Cancel</LoadingButton>
                    <LoadingButton isLoading={loading} onClick={save}>Salvar</LoadingButton>
                </DialogActions>
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