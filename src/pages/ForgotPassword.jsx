import { Alert, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../service/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import LoadingButton from "../components/LoadingButton";
import RoundedInput from "../components/RoundedInput";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexFlow: "column",
    width: "100%",
    padding: "16px",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(90deg, rgba(0,185,255,1) 0%, rgba(0,212,255,1) 100%);",
    height: "100vh",
  },
  loginBox: {
    display: "flex",
    maxWidth: "500px!important",
    width: "100%",
    flexFlow: "column",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,1)",
    padding: "30px 15px 15px 15px",
    borderRadius: "15px ",
    boxShadow: "5px 5px 10px rgba(33,150,243,1)",
  },
  input: {
    margin: "10px 0px !important",
    width: "100%",
    alignSelf: "center",
  },
  buttonProgress: {
    transition: "all 0.3s",
    marginLeft: "4px",
    width: "0px",
  },
}));

export default function ForgotPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <div className={[classes.container].join(" ")}>
      <form className={[classes.loginBox].join(" ")} onSubmit={handleSubmit}>
        {emailSent ? (
          <>
            <Typography variant="h6" color="primary" ce>
              Email de recuperação enviado!
            </Typography>
            <Typography variant="subtitle2">
              Verifique sua caixa de email.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" color="primary">
              Esqueceu sua senha?
            </Typography>
            <Typography variant="subtitle2">
              Nós o enviaremos um link para alterar sua senha.
            </Typography>
            <RoundedInput
              className={classes.input}
              label="Email"
              type="email"
              variant="outlined"
              size="small"
              value={email}
              inputProps={{
                minLength: "6",
              }}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              isLoading={isLoading}
            >
              Enviar email
            </LoadingButton>
          </>
        )}
        <Button color="primary" component={Link} to="/">
          Voltar para o login
        </Button>
        <Alert
          severity="error"
          style={{ marginTop: "5px", display: error === "" ? "none" : "" }}
        >
          {error}
        </Alert>
      </form>
    </div>
  );
}
