import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export default withStyles((theme) => ({
  root: {
    borderRadius: "30px",
    "& input + fieldset": {
      borderRadius: "30px",
    },
    "& input:focus + fieldset": {
      borderColor: '#000',
    },
  },
}))(TextField);
