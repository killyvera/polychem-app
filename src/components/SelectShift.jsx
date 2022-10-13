import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Container } from '@mui/system';

export const SelectShift = (props) => {
    const [shift, setShift] = useState('');

    const handleChange = (event) => {
        setShift(event.target.value);
        console.log(shift)
        props.getSgift(shift)
    };

    return (
        <FormControl style={{ marginTop: '5px',display:'flex', alignItems: 'center' }} >
            <FormLabel id="radio-shift">Turno</FormLabel>
            <RadioGroup
                row
                aria-labelledby="radio-shift"
                name="radio-shift"
                value={shift}
                onChange={handleChange}
            >
                <FormControlLabel labelPlacement="top" value="matutino" control={<Radio size="small" />} label="Matutino" />
                <FormControlLabel labelPlacement="top" value="vespertino" control={<Radio size="small" />} label="Vespertino" />
            </RadioGroup>
        </FormControl>
    );
}