import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Hidden,
} from "@material-ui/core";
import { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import UserIcon from "@material-ui/icons/Person";

export default function MainTemplate(props) {
  const [user, setUser] = useState(initUser());

  function initUser(){
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  }

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
            <Typography component="div">{user.name}</Typography>
            <UserIcon sx={{ paddingLeft: "10px", fontSize: "30px" }} />
          </Hidden>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
