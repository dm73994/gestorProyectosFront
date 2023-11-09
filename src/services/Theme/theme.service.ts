import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        customs: Palette['primary'];
    }
  
    interface PaletteOptions {
        customs?: PaletteOptions['primary'];
    }
    interface Components {
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            // Aquí puedes definir las propiedades de estilo que desees anular
          };
        };
      };
    }
}

export const theme = createTheme( {
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
      main: '#F2F3F8', 
      light: '#fff',
      dark: '#171a4a',
      contrastText: '#fff',
    },
    error: {
      main: '#D0011A',
    },
    warning: {
      main: '#ff9800',
    },
    success: {
      main: '#4caf50',
      contrastText: '#fff',
    },
    info: {
      main: '#1890ff',
      light: '#89CFF0'
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Inter, sans-serif, Roboto',
    }
  },
  components: {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          color: '#171a4a',
          borderRadius: 4,
          borderWidth: 5,
          borderColor: '#000',
          border: '1px solid',
          backgroundColor: '#FFF',
        }
      }
    }
  }
});