import axios from 'axios';

export default function api_insere_lista(inputText, callback) {
  let quebra = '\n';
  let textoFeedback = '';
  let inseridos = `REGISTROS INSERIDOS COM SUCESSO:\ndata_hora_lancamento\tnumero\tmodalidade\n`
  let duplicados = `REGISTROS DUPLICADOS!:\ndata_hora_lancamento\tnumero\tmodalidade\n`
  const apiUrl = `http://${process.env.REACT_APP_API_HOST}/insere_lista`;
  axios.post(apiUrl, { data: inputText })
    .then(response => {
      const registros_inseridos = JSON.parse(response.data).registros_inseridos;
      const registros_duplicados = JSON.parse(response.data).registros_duplicados;
      if (registros_inseridos.length > 0) {
        registros_inseridos.forEach((coluna) => {
          inseridos += `${coluna.data_hora_lancamento}\t${coluna.numero}\t${coluna.modalidade}\n`
        })
      } else {
        inseridos = '';
        quebra = '';
      }
      if (registros_duplicados.length > 0) {
        registros_duplicados.forEach((coluna) => {
          duplicados += `${coluna.data_hora_lancamento}\t${coluna.numero}\t${coluna.modalidade}\n`
        })
      } else {
        duplicados = '';
        quebra = '';
      }
      textoFeedback = inseridos + quebra + duplicados
      callback(textoFeedback);
      textoFeedback = '';
    })
    .catch(error => {
      callback(error);
    });
}