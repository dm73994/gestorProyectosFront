import { Switch, styled } from "@mui/material";

export const PinkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
        color: theme.palette.error.main,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: theme.palette.success.main,
    //   '&:hover': {
    //     backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    //   },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: theme.palette.success.main,
    },
}));