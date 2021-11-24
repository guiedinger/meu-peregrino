import { Box } from "@material-ui/core";
import { useState } from "react";
import { SideMenu } from "../components/SideMenu";
import MyAppBar from "../components/MyAppBar";

const drawerWidth = 240;

export default function MainTemplate() {
  const [user, setUser] = useState(initUser());
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
      <MyAppBar user={user} drawerWidth={drawerWidth} onMenuButtonClick={handleDrawerToggle}/>
      <SideMenu user={user} drawerWidth={drawerWidth} isSmDevice={isSmDevice} onDrawerClose={handleDrawerToggle}/>
    </Box>

  );
}
