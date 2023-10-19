import { styled, Typography } from '@mui/material';


export const LimitedText = styled(Typography, {  })(({ theme }) => ({
    width: '200px', /* Ancho fijo */
    whiteSpace: 'nowrap', /* Evita que el texto se divida en varias líneas */
    overflow: 'hidden', /* Oculta el texto que se desborda */
    textOverflow: 'ellipsis', /* Agrega puntos suspensivos (...) al final del texto que se desborda */
}));