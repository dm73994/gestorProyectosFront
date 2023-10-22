import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
    background: theme.palette.customs.light,
    height: '100%',
    width: '100%',
}))