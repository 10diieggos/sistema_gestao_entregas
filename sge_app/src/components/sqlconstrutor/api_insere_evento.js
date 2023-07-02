import axios from 'axios';

export default function api_insere_evento(inputText, callback) {
  let textoFeedback = '';
  let objetos = 'Cadastre estes objetos e Tente inserir novamente!\n';
  let inseridos = `REGISTROS INSERIDOS COM SUCESSO\ncodigo\tdata_hora\tsituacao\n`
  let duplicados = `REGISTROS DUPLICADOS!:\ncodigo\tdata_hora\tsituacao\n`
  const apiUrl = `http://${process.env.REACT_APP_API_HOST}/insere_evento`;
  axios.post(apiUrl, inputText, {
    headers: {
      'Content-Type': 'text/plain'
    }
  })
    .then(response => {
      console.log(response.data)
      const registros_inseridos = JSON.parse(response.data).registros_inseridos;
      const registros_duplicados = JSON.parse(response.data).registros_duplicados;
      let objetos_nao_cadastrados = JSON.parse(response.data).objetos_nao_cadastrados;
      if (objetos_nao_cadastrados.length > 0) {
        objetos_nao_cadastrados = [...new Set(objetos_nao_cadastrados)]
        objetos_nao_cadastrados.forEach((objeto) => {
          objetos += `${objeto}\n`
        })
      } else {
        objetos = '';
      }
      if (registros_inseridos.length > 0) {
        registros_inseridos.forEach((coluna) => {
          inseridos += `${coluna.codigo}\t${coluna.data_hora}\t${coluna.situacao}\n`
        })
      } else {
        inseridos = '';
      }
      if (registros_duplicados.length > 0) {
        registros_duplicados.forEach((coluna) => {
          duplicados += `${coluna}`
        })
      } else {
        duplicados = '';
      }
      textoFeedback = `${objetos}\n${inseridos}\n${duplicados}`.trim()
      callback(textoFeedback);
      textoFeedback = '';
    })
    .catch(error => {
      callback(error);
    });
}