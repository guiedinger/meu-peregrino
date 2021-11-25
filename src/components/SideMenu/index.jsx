import { Toolbar, List, ListItem, ListItemIcon, ListItemText, Box, Drawer, Divider } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { menuList } from './List';
import { SideMenuItem } from '../SideMenuItem';
import { UserComponent } from '../UserComponent';

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

  const drawerBody = (
    <div className={classes.drawer}>
      <Toolbar />
      <UserComponent user={props.user} />
      <Divider />
      <List>
        {menuList.map((item, index) => (
          <SideMenuItem index={index} icon={item.icon} name={item.name} link={item.link} />
        ))}
      </List>

      <div className={classes.userArea}>
        <Divider />
        <SideMenuItem icon={<LogoutIcon />} name='Sair' />
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