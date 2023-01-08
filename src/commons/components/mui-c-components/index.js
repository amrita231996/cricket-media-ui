import { styled } from '@mui/material/styles';
import { FormControlLabel, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField'
import S from './select.component';

export const Select = S;

export const CCheckbox = styled(Checkbox)({
    '&.MuiCheckbox-root': {
        color: '#FFFFFF',
    },
    '&.Mui-checked': {
        color: '#FFFFFF',
    }
});

export const CFormControlLabel = styled(FormControlLabel)({
    '& .MuiFormControlLabel-label': {
        color: '#FFFFFF',
        cursor: 'pointer',
    },
});

export const CTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#FFFFFF',
    },
    '& label': {
        display: 'none',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#979797',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#979797',
        },
        '&:hover fieldset': {
            borderColor: '#979797',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#979797',
        },
        '& legend': {
            display: 'none',
        },
        '& ::placeholder': {
            color: '#979797',
            fontSize: 18,
            opacity: 1,
        },
    },
});
