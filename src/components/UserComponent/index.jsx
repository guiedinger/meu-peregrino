import { Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import UserIcon from '@material-ui/icons/Person';
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 15px'
    },
    icon: {
        fontSize: '30px',
        color: grey[600],
        paddingRight: '5px',
    },
    username: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: '15px',
        marginBottom: '-5px',
    },
    email: {
        fontSize: '13px',
    }
}));

export function UserComponent(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <UserIcon className={classes.icon} />
            <div>
                <Typography  className={classes.username} >
                    {props.user.name}
                </Typography>
                <Typography  className={classes.email} >
                    {props.user.email}
                </Typography>
            </div>
        </div>
    );
}