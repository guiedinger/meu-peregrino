import { Toolbar, List, Box, Drawer, Divider } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { menuList } from './List';
import { SideMenuItem } from '../SideMenuItem';
import { UserComponent } from '../UserComponent';
import { signOut } from "firebase/auth";
import { auth } from "../../service/firebase";
import { useHistory } from 'react-router';
import {ADMIN} from '../../utils/roles';

const useStyles = makeStyles((theme) => ({
  drawer: {
    height: '100%'
  },
  userArea: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  }
}));

export function SideMenu(props) {
  const classes = useStyles();
  const { window } = props;
  const history = useHistory();

  function logout() {
    localStorage.setItem("user", '');
    signOut(auth);
    history.push("/");
  }

  function menu(){
    let list = [];
    menuList.forEach((element) => {
      if(props.user == null || (element.role === ADMIN &&  props.user.role !== ADMIN)){
        return;
      }
      list.push(element);
    });
    return list;
  }

  function handleClick(path) {
    history.push(path);
  }

  const drawerBody = (
    <div className={classes.drawer}>
      <Toolbar />
      <UserComponent user={props.user} />
      <Divider />
      <List>
        {menu().map((item, index) => (
          <SideMenuItem index={index} icon={item.icon} name={item.name} onClick={() => { handleClick(item.link) }} />
        ))}
      </List>

      <div className={classes.userArea}>
        <Divider />
        <SideMenuItem icon={<LogoutIcon />} name='Sair' index={-1} onClick={() => { logout() }} />
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { md: props.drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={props.isSmDevice}
          onClose={(e) => props.onDrawerClose()}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
          }}
        >
          {drawerBody}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
          }}
          open
        >
          {drawerBody}
        </Drawer>
      </Box>
    </Box>
  );
}