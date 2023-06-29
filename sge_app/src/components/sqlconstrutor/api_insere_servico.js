import axios from 'axios';

let textoFeedback = `REGISTROS INSERIDOS COM SUCESSO\n`

export default function api_insere_servico(inputText, callback) {
  const apiUrl = `http://${process.env.REACT_APP_API_HOST}/insere_servico`;
  axios.post(apiUrl, { data: inputText })
    .then(response => {
      const registros = JSON.parse(response.data).registros;
      registros.forEach((coluna) => {
        textoFeedback += `${coluna.sigla}\n`
      })
      callback(textoFeedback);
    })
    .catch(error => {
      console.log(error);
    });
}