import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function SelectMenu(props) {
    return (
        <FormControl sx={{ m: 0, marginTop: '15px', minWidth: '100%' }}>
            <InputLabel id={"select-" + props.name}>{props.label}</InputLabel>
            <Select
                style={{
                    borderRadius: "15px",
                    "& input + fieldset": {
                        borderRadius: "15px",
                    },
                    "& input:focus + fieldset": {
                        borderColor: '#000',
                    },
                }}
                labelId={"select-" + props.name}
                name={props.name}
                value={props.value}
                label={props.label}
                onChange={props.onChange}
                size='small'
            >
                {props.options.map((item, index) => (
                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}