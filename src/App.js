import React, { useState } from 'react';
import consultarCNPJ from './cnpj';
import {
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [cnpj, setCNPJ] = useState('');
  const [dadosCNPJ, setDadosCNPJ] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [showDados, setShowDados] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleConsultarCNPJ = async () => {
    try {
      const dados = await consultarCNPJ(cnpj);
      setDadosCNPJ(dados);
      setErrorOpen(false);
      setShowDados(true);
    } catch (error) {
      console.error(error);
      setErrorOpen(true);
    }
  };

  const handleAlertClose = () => {
    setErrorOpen(false);
  };

  const handleInputChange = (e) => {
    setCNPJ(e.target.value);
    setShowDados(false);
  };

  const handleInputBlur = () => {
    if (cnpj.trim() === '') {
      setCNPJ('');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Typography variant="h4" gutterBottom>
        <center>
          <a href='https://www.instagram.com/eog_xx/'>@eog_xx</a>
        </center>
      </Typography>
      <CssBaseline />
      <Container>
        <Typography variant="h4" gutterBottom>
          Consulta de CNPJ
        </Typography>

        <TextField
          label="Digite o CNPJ"
          variant="outlined"
          value={cnpj}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleConsultarCNPJ}
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Consultar
        </Button>

        {dadosCNPJ && !errorOpen && showDados && (
          <Paper style={{ marginTop: '16px', padding: '16px' }}>
            <Typography variant="h5" gutterBottom>
              Dados do CNPJ:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary={`CNPJ: ${dadosCNPJ.cnpj}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`Razão Social: ${dadosCNPJ.razao_social}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`Nome Fantasia: ${dadosCNPJ.nome_fantasia}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`UF: ${dadosCNPJ.uf}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`Município: ${dadosCNPJ.municipio}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`Bairro: ${dadosCNPJ.bairro}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`CEP: ${dadosCNPJ.cep}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`Porte: ${dadosCNPJ.porte}`} />
              </ListItem>
              {/* Adicione mais campos aqui */}
            </List>
          </Paper>
        )}

        <Snackbar
          open={errorOpen}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MuiAlert onClose={handleAlertClose} severity="error" elevation={6} variant="filled">
            Erro na consulta do CNPJ
          </MuiAlert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;
