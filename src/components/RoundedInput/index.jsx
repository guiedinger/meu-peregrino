import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export default withStyles((theme) => ({
  root: {
    borderRadius: "15px",
    "& input + fieldset": {
      borderRadius: "15px",
    },
    "& input:focus + fieldset": {
      borderColor: '#000',
    },
    marginTop: '15px', 
    width: '100%'
  },
}))(TextField);
