import NavBar from '../components/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({ palette: { mode: 'light' } });

export default function MyApp({ Component, pageProps }){
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div style={{ padding: 16 }}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}