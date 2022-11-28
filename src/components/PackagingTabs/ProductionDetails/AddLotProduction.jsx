import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";

export default function AddLotProduction({ productDetail }) {
  const [value, setValue] = useState(null);

  return (
    <>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="lot">Lot</InputLabel>
        <FilledInput id="lot" value="asfaf95" name="lot" />
      </FormControl>
      <FormControl sx={{ marginTop: "1rem" }} fullWidth variant="filled">
        <InputLabel htmlFor="expire-date">Expire Date</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            components={{
              OpenPickerIcon: CalendarMonthIcon,
            }}
            InputAdornmentProps={{ id: "expire-date" }}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <FilledInput {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl sx={{ marginTop: "1rem" }} fullWidth variant="filled">
        <InputLabel htmlFor="units">Units</InputLabel>
        <FilledInput id="units" value="" name="units" />
      </FormControl>
      <FormControl sx={{ marginTop: "1rem" }} fullWidth variant="filled">
        <InputLabel htmlFor="code">Code</InputLabel>
        <FilledInput id="code" value="" name="code" />
      </FormControl>
    </>
  );
}
