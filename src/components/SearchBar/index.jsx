import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

export default function SearchBar(props) {
    return (
            <Paper
                component="form" elevation='4' onSubmit={props.onSubmit}
                sx={{ p: '0px 0px', display: 'flex', alignItems: 'center', maxWidth: 300, width: '100%', margin: '0 15px', height: '35px', borderRadius: '15px' }}
            >
                <InputBase
                    sx={{ ml: 2, flex: 1 }}
                    placeholder="Buscar pelo Nome"
                    inputProps={{ 'aria-label': 'Buscar pelo Nome' }}
                    value={props.value}
                    onChange={props.onChange}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>

            </Paper>
    );
}