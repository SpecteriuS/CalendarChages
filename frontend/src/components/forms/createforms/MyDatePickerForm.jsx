import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/nl'
import dayjs from 'dayjs';

export default function MyDateTimePickerForm({label, value, name, onChange}) {
    const handleDateChange = (newDate) => {
        onChange({ target: {name:name, value: dayjs(newDate)}})

    }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='nl'>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker 
            sx={{width:'100%'}}
            value = {value}
            onChange = {handleDateChange}
            name={name}
            label={label}
            />
      </DemoContainer>
    </LocalizationProvider>
  );
}
