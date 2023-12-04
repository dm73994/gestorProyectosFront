import { Suspense } from 'react';
import { AppRouter } from './Router'
import { Provider } from 'react-redux'
import { store } from './redux'
import { theme } from './services'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { NavigationProvider } from './context'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import { Loader } from './components';


export const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>         
            <ThemeProvider theme={theme}>
              <NavigationProvider>
                <CssBaseline />
                <AppRouter />
              </NavigationProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </Suspense>
    </>
  )
}
