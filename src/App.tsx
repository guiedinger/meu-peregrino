import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import Routes from "./Routes";

const theme = createTheme({
  
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes/>
    </ThemeProvider>
  );
}
