import { ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import { useHistory } from "react-router-dom";


export function SideMenuItem(props) {
    const history = useHistory();

    function handleClick(){
        history.push(props.link);
    }

    return (
        <ListItem button key={props.index} onClick={handleClick} >
            <ListItemIcon>
                {props.icon}
            </ListItemIcon>
            <ListItemText primary={props.name} />
        </ListItem>
    );
}