import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import Routes from "./Routes";

const theme = createTheme({
  palette: {
    primary: blue,
  },
  typography: {
    button: {
      textTransform: "none",
    },
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
