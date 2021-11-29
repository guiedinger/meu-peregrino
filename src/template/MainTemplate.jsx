import { Box, Toolbar } from "@material-ui/core";
import { useState } from "react";
import { SideMenu } from "../components/SideMenu";
import MyAppBar from "../components/MyAppBar";


const drawerWidth = 240;

export default function MainTemplate(props) {
  const [user] = useState(initUser());
  const [isSmDevice, setSmDevice] = useState(false);

  const handleDrawerToggle = () => {
    setSmDevice(!isSmDevice);
  };

  function initUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MyAppBar user={user} drawerWidth={drawerWidth} onMenuButtonClick={handleDrawerToggle} />
      <SideMenu user={user} drawerWidth={drawerWidth} isSmDevice={isSmDevice} onDrawerClose={handleDrawerToggle} />
      <Toolbar/>
      <Box
        sx={{ flexGrow: 1, p: 1.5, width: { md: `calc(100% - ${drawerWidth}px)` }, marginLeft: { md: `${drawerWidth}px` }}}
      >
        {props.children}
      </Box>
    </Box>


  );
}
