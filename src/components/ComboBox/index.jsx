import Autocomplete from '@material-ui/core/Autocomplete';
import RoundedInput from '../RoundedInput';

export default function ComboBox(props) {
  return (
    <Autocomplete
      
      onChange={props.onChange}
      id="combo-box-demo"
      getOptionLabel={(option) => option.name}
      value={props.value}
      options={props.list}
      sx={{ width: '100%', borderRadius: '15px' }}
      renderInput={(params) => <RoundedInput {...params} size="small" label={props.label} />}
    />
  );
}
