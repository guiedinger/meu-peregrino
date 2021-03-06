import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';


export function SideMenuItem(props) {   

    return (
        <ListItem button key={props.index} onClick={() => props.onClick()} >
            <ListItemIcon>
                {props.icon}
            </ListItemIcon>
            <ListItemText primary={props.name} />
        </ListItem>
    );
}