import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './Router'
import { Provider } from 'react-redux'
import { store } from './redux'
import { theme } from './services'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { NavigationProvider } from './context'


export const App = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <NavigationProvider>
              <CssBaseline />
              <AppRouter />
            </NavigationProvider>
          </ThemeProvider>
        </Provider>
      </Suspense>
    </>
  )
}
