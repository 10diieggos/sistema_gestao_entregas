import axios from 'axios';
export default function api_insere_objetosXlistas(inputText, callback) {
  let textoFeedback = '';
  let objetos = 'Cadastre estes objetos e Tente inserir novamente!\n';
  let listas = 'Cadastre estas listas e Tente inserir novamente!\n';
  let inseridos = `REGISTROS INSERIDOS COM SUCESSO\ncodigo\tlista\titem\n`
  let duplicados = `REGISTROS DUPLICADOS!:\ncodigo\tlista\titem\n`
  const apiUrl = `http://${process.env.REACT_APP_API_HOST}/insere_objetosXlistas`;
  axios.post(apiUrl, { data: inputText })
    .then(response => {
      console.log(response.data)
      const registros_inseridos = JSON.parse(response.data).registros_inseridos;
      const registros_duplicados = JSON.parse(response.data).registros_duplicados;
      let objetos_nao_cadastrados = JSON.parse(response.data).objetos_nao_cadastrados;
      let listas_nao_cadastradas = JSON.parse(response.data).listas_nao_cadastradas;
      if (objetos_nao_cadastrados.length > 0) {
        objetos_nao_cadastrados = [...new Set(objetos_nao_cadastrados)]
        objetos_nao_cadastrados.forEach((objeto) => {
          objetos += `${objeto}\n`
        })
      } else {
        objetos = '';
      }
      if (listas_nao_cadastradas.length > 0) {
        listas_nao_cadastradas = [...new Set(listas_nao_cadastradas)]
        listas_nao_cadastradas.forEach((lista) => {
          listas += `${lista}\n`
        })
      } else {
        listas = '';
      }
      if (registros_inseridos.length > 0) {
        registros_inseridos.forEach((coluna) => {
          inseridos += `${coluna.codigo}\t${coluna.numero}\t${coluna.posicao_objeto}\n`
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
      textoFeedback = `${objetos}\n${listas}\n${inseridos}\n${duplicados}`.trim()
      callback(textoFeedback);
      textoFeedback = '';
    })
    .catch(error => {
      callback(error);
    });
}