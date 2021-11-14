import { makeStyles } from "@material-ui/styles";
import { CircularProgress } from "@material-ui/core";
import RoundedButton from "../RoundedButton";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    transition: "all 0.3s",
    //color: theme.palette.primary,
    marginLeft: "4px",
    width: "0px",
  },
}));

export default ({ children, isLoading, disabled, ...rest }) => {
  const classes = useStyles();
  return (
    <RoundedButton {...rest} disabled={isLoading || disabled}>
      {children}
      <CircularProgress
        size={isLoading ? 16 : 0}
        className={classes.buttonProgress}
      />
    </RoundedButton>
  );
};
