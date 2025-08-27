import NavBar from '../components/NavBar';
import { CssBaseline, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({ palette: { mode: 'light' } });

export default function RootLayout({ children }){
  return (
    <html>
      <head />
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar />
          <Container sx={{ mt:2 }}>{children}</Container>
        </ThemeProvider>
      </body>
    </html>
  );
}