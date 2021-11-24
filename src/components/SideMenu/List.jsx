import People from '@material-ui/icons/People';
import CheckBox from '@material-ui/icons/CheckBox';
import ListAlt from '@material-ui/icons/ListAlt';
import Category from '@material-ui/icons/Category';
import {ADMIN, COMMON} from '../../utils/roles';

export const menuList = [
    {
        name:"Lançamentos",
        link:"/lancamentos",
        icon:<CheckBox/>,
        role: COMMON
    },
    {
        name:"Visão Geral",
        link:"/visao_geral",
        icon:<ListAlt/>,
        role: COMMON
    },
    {
        name:"Itens",
        link:"/itens",
        icon:<Category/>,
        role: COMMON
    },
    {
        name:"Usuários",
        link:"/users",
        icon:<People/>,
        role: ADMIN
        
    },
];