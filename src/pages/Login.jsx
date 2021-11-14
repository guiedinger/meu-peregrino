import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import LoadingButton from "../components/LoadingButton";
import RoundedInput from "../components/RoundedInput";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "250px",
    maxWidth: "70%",
    height: "81px",
    margin: "1.5rem 0rem 1rem 0rem",
  },
  form: {
    display: "flex",
    flexFlow: "column",
    width: "100%",
    padding: "16px",
  },
  input: {
    paddingBottom: "10px",
    width: "95%",
    alignSelf: "center",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonProgress: {
    transition: "all 0.3s",
    //color: theme.palette.primary,
    marginLeft: "4px",
    width: "0px",
  },
}));

export default function Login() {
  const classes = useStyles();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <section>
        <RoundedInput
          className={classes.input}
          label="Login"
          variant="outlined"
          size="small"
          inputProps={{ minLength: "4" }}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <RoundedInput
          className={classes.input}
          label="Senha"
          type="password"
          variant="outlined"
          size="small"
          inputProps={{ minLength: "6" }}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          isLoading={isLoading}
        >
          Entrar
        </LoadingButton>
      </section>
    </div>
  );
}
