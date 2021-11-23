import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { blue, grey } from "@material-ui/core/colors";
import Routes from "./Routes";

const theme = createTheme({
  palette: {
    primary: blue,
  },
  typography: {
    button: {
      textTransform: "none",
    },
    h4: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
    },
    h6: {
      fontWeight: "bold",
      color: grey[500]
    }
  },

});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}
