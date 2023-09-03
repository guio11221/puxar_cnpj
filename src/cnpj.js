import axios from "axios";

// Função para consultar um CNPJ
const consultarCNPJ = async (cnpj) => {
  if (!cnpj || cnpj.length < 14 || cnpj.length > 14) {
    throw new Error('CNPJ inválido');
  }

  try {
    // Faça a requisição GET para a API com o CNPJ fornecido
    const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);

      return response.data;

  } catch (error) {

      throw new Error(error.response.message);

  }
};

export default consultarCNPJ;
