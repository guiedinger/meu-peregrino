import {Box} from '@material-ui/core';

export default function HeadInfo(props) {
    return (
        <Box sx={{ boxShadow: '0px 0px 5px #BABBBB', marginBottom: '10px', borderRadius: '20px', padding: '5px 10px', display: 'flex', alignItems: 'center' }}>
            {props.children}
        </Box>
    );
}