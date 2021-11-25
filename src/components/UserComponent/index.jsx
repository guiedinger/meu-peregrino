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
        fontSize: '15px',
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
                <Typography variant="h5" className={classes.username} >
                    {props.user.name}
                </Typography>
                <Typography variant="h6" className={classes.email} >
                    {props.user.email}
                </Typography>
            </div>
        </div>
    );
}