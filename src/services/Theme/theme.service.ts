import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        customs: Palette['primary'];
    }
  
    interface PaletteOptions {
        customs?: PaletteOptions['primary'];
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#171a4a',
            contrastText: '#fff',
        },
        secondary: {
            main: '#388E3C',
        },
        background:{
            default: '#ffffffff',
            paper: '#171a4a',
        },
        text:{
            primary: '#000',
            secondary: '#fff',
            disabled: '#C8C8C8',            
        },
        customs: {
            main: '#C8C8C8', 
            light: '#fff',
            dark: '#171a4a',
            contrastText: '#000',
        }
    },
    typography: {
        allVariants: {
            fontFamily: 'Inter, sans-serif, Roboto',
        }
    }
});