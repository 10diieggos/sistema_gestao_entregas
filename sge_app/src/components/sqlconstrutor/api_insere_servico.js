import axios from 'axios';

let textoFeedback = `REGISTROS INSERIDOS COM SUCESSO\nprazo_guarda_interna\tadmite_residuo\ttentativas_externas_previstas\tsigla\tdescricao\tcategoria\tfamilia\tgera_pre_alerta\thora_real_entrega\tdados_do_recebedor_na_baixa\tentrega_externa\tentrega_com_imagem\n`

export default function api_insere_servico(inputText, callback) {
  const apiUrl = `http://${process.env.REACT_APP_API_HOST}/insere_servico`;
  axios.post(apiUrl, { data: inputText })
    .then(response => {
      const registros = JSON.parse(response.data).registros;
      registros.forEach((coluna) => {
        textoFeedback += `${coluna.prazo_guarda_interna}\t${coluna.admite_residuo}\t${coluna.tentativas_externas_previstas}\t${coluna.sigla}\t${coluna.descricao}\t${coluna.categoria}\t${coluna.familia}\t${coluna.gera_pre_alerta}\t${coluna.hora_real_entrega}\t${coluna.dados_do_recebedor_na_baixa}\t${coluna.entrega_externa}\t${coluna.entrega_com_imagem}\n`
      })
      callback(textoFeedback);
    })
    .catch(error => {
      console.log(error);
    });
}