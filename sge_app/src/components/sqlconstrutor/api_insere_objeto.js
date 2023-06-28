import axios from 'axios';

let textoFeedback = `REGISTROS INSERIDOS COM SUCESSO\ncodigo\tdestinatario\tendereco\tnum_endereco\tdistribuicao\n`

export default function api_insere_objeto(inputText, callback) {
  const apiUrl = `http://${process.env.REACT_APP_API_HOST}/insere_objeto`;
  axios.post(apiUrl, { data: inputText })
    .then(response => {
      const registros = JSON.parse(response.data).registros;
      registros.forEach((coluna) => {
        textoFeedback += `${coluna.codigo}\t${coluna.destinatario}\t${coluna.endereco}\t${coluna.num_endereco}\t${coluna.distribuicao}\n`
      })
      callback(textoFeedback);
    })
    .catch(error => {
      console.log(error);
    });
}