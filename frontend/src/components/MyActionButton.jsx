import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function MyActionButton({ label, type, onclick }) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" type={type} onClick={onclick} >{label}</Button>
    </Stack>
  );
}
