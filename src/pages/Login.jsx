import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { blue, lightBlue } from "@material-ui/core/colors";

import { useState } from "react";
import LoadingButton from "../components/LoadingButton";
import RoundedInput from "../components/RoundedInput";
import logo from '../logo.png';

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: "100px",
    maxHeight: "100px",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    margin: "0 0rem 1rem 0rem",
  },
  container: {
    display: "flex",
    flexFlow: "column",
    width: "100%",
    padding: "16px",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(90deg, rgba(0,185,255,1) 0%, rgba(0,212,255,1) 100%);",
    height: "100vh"
  },
  loginBox: {
    display: "flex",
    maxWidth: "500px!important",
    width: "100%",
    flexFlow: "column",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,1)",
    padding: "30px 15px",
    borderRadius: "15px ",
    boxShadow: "5px 5px 10px rgba(33,150,243,1)",
  },
  input: {
    marginBottom: "10px!important",
    width: "100%",
    alignSelf: "center",
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
    <div className={[classes.container].join(' ')}>
      <section className={[classes.loginBox].join(' ')}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} className={classes.logo} />
        </div>
        
        <RoundedInput
          className={classes.input}
          label="Login"
          variant="outlined"
          size="small"
          value={login}
          inputProps={{
            minLength: "4"
          }}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <RoundedInput
          className={classes.input}
          label="Senha"
          type="password"
          variant="outlined"
          size="small"
          value={password}
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
