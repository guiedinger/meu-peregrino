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


export default function Users() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [entity, setEntity] = useState(createNewEntity());
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetch();
    }, []);

    function fetch() {
        findAll(collections.users).then((data) => {
            setData(data);
        });
    }

    function createNewEntity() {
        return { id: null, name: '', email: '', role: COMMON };
    }

    function newEntity() {
        setEntity(createNewEntity());
        setPassword('');
        setOpen(true);
    };

    async function handleEdit(params, event, details) {
        const dbObj = await findByKey(collections.users, params.id);
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
            if (entity.id == null) {
                const credentials = await createUser();
                entity.id = credentials.user.uid;
            }
            await persist(collections.users, entity);
        } catch (e) {
            setOpen(false);
            setLoading(false);
        }
        fetch();
        setOpen(false);
        setLoading(false);
    }

    async function createUser() {
        return await createUserWithEmailAndPassword(auth, entity.email, password);
    }


    return (
        <MainTemplate>
            <HeadInfo>
                <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
                    <Typography color="text.primary">Usuários</Typography>
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
                                sx={{marginTop: '15px'}}
                                required
                            />

                        </Grid>
                        <Grid item xs={12} md={6} >
                            <SelectMenu label="Papel" name='role' value={entity.role} onChange={handleChange} size="small"
                                options={[{ label: 'Normal', value: COMMON }, { label: 'Administrador', value: ADMIN }]} required />
                        </Grid>
                        <Grid item xs={12} >
                            <RoundedInput
                                label="E-mail"
                                name="email"
                                value={entity.email}
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                                inputProps={{
                                    minLength: "4"
                                }}
                                required
                            />
                        </Grid>
                        {entity.id === null &&
                            <Grid item xs={12} >
                                <RoundedInput
                                    label="Senha"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                    inputProps={{
                                        minLength: "6"
                                    }}
                                    required
                                />
                            </Grid>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <LoadingButton isLoading={loading} onClick={handleClose}>Voltar</LoadingButton>
                    <LoadingButton isLoading={loading} variant='contained' onClick={save}>Salvar</LoadingButton>
                </DialogActions>
            </FormDialog>
        </MainTemplate>);

}


const columns = [
    {
        field: 'name',
        headerName: 'Nome',
        flex: 0.3,
        minWidth: 200
    },
    {
        field: 'email',
        headerName: 'E-mail',
        flex: 0.5,
        minWidth: 200
    },
    {
        field: 'role',
        headerName: 'Papel',
        flex: 0.2,
        minWidth: 150
    }
];