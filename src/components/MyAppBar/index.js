import { AppBar, Toolbar, Typography, IconButton, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import UserIcon from '@material-ui/icons/PersonRounded';

export default function MyAppBar(props) {
    return (
        <AppBar position="fixed" sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1
        }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    onClick={(e) => props.onMenuButtonClick()}
                    aria-label="menu"
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Meu Peregrino
                </Typography>
                <Hidden smDown>
                    <Typography component="div">{props.user.name}</Typography>
                    <UserIcon sx={{ paddingLeft: "10px", fontSize: "30px" }} />
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}