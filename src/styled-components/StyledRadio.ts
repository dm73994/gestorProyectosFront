import { Radio, styled } from '@mui/material';

export const StyledRadio = styled(Radio)(({theme}) => ({
  color: theme.palette.text.disabled,
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  }
}))