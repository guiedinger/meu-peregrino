import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Hidden,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import UserIcon from "@material-ui/icons/Person";

export default function MainTemplate(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Meu Peregrino
          </Typography>
          <Hidden smDown>
            <UserIcon sx={{ paddingRight: "10px", fontSize: "30px" }} />
            <Typography component="div">Nome do Usuário</Typography>
          </Hidden>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
