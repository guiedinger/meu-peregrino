import { makeStyles } from "@material-ui/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(() => ({
  paper: { width: "95%", margin: 0, maxWidth: '900px!important' },
}));

export default function FormDialog(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose} style={{ color: 'black' }}  classes={{ paper: classes.paper}}>
        <DialogTitle style={{ color: 'black' }} >{props.title}</DialogTitle>
        {props.children}
      </Dialog>
    </div>
  );
}