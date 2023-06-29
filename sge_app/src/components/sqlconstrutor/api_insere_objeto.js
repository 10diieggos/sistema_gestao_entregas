import axios from 'axios';

export default function api_insere_objeto(inputText, callback) {
  let textoFeedback = '';
  let servicos = 'Cadastre estes serviços e Tente inserir novamente!\n';
  let inseridos = `REGISTROS INSERIDOS COM SUCESSO\nordem\tcodigo\n`
  let duplicados = `REGISTROS DUPLICADOS!:\nordem\tcodigo\n`
  const apiUrl = `http://${process.env.REACT_APP_API_HOST}/insere_objeto`;
  axios.post(apiUrl, { data: inputText })
    .then(response => {
      const registros_inseridos = JSON.parse(response.data).registros_inseridos;
      const registros_duplicados = JSON.parse(response.data).registros_duplicados;
      let servicos_nao_cadastrados = JSON.parse(response.data).servicos_nao_cadastrados;
      if (servicos_nao_cadastrados.length > 0) {
        servicos_nao_cadastrados = [...new Set(servicos_nao_cadastrados)]
        servicos_nao_cadastrados.forEach((servico) => {
          servicos += `${servico}\n`
        })
      } else {
        servicos = '';
      }
      if (registros_inseridos.length > 0) {
        registros_inseridos.forEach((coluna) => {
          inseridos += `${coluna.ordem}\t${coluna.codigo}\n`
        })
      } else {
        inseridos = '';
      }
      if (registros_duplicados.length > 0) {
        registros_duplicados.forEach((coluna) => {
          duplicados += `${coluna.ordem}\t${coluna.codigo}\n`
        })
      } else {
        duplicados = '';
      }
      textoFeedback = `${servicos}\n${duplicados}\n${inseridos}`.trim()
      callback(textoFeedback);
      textoFeedback = '';
    })
    .catch(error => {
      callback(error);
    });
}