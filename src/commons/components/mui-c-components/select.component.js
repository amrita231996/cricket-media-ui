import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function Select() {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Age
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'I am from',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Andhra Pradesh</option>
          <option value={20}>Arunachal Pradesh</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}