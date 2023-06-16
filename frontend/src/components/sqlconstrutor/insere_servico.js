export default function insere_servico(inputText) {
  let query = "INSERT INTO Servicos\n (prazo_guarda_interna,\n admite_residuo,\n tentativas_externas_previstas,\n sigla,\n descricao,\n categoria,\n familia,\n gera_pre_alerta,\n hora_real_entrega,\n dados_do_recebedor_na_baixa,\n entrega_externa,\n entrega_com_imagem) VALUES\n";

  for (let linha of inputText.split("\n")) {
    if (linha.trim() === "") continue;

    let campos = linha.split("\t");
    let valores = campos.slice(0, 10).map(valor => isNaN(valor) ? "'" + valor + "'" : valor).join(", ");
    valores += ", " + campos.slice(10).join(", ");
    query += "(" + valores + "),\n";
  }

  return query.slice(0, -2) + "ON DUPLICATE KEY UPDATE prazo_guarda_interna = VALUES(prazo_guarda_interna), admite_residuo = VALUES(admite_residuo), tentativas_externas_previstas = VALUES(tentativas_externas_previstas), sigla = VALUES(sigla), descricao = VALUES(descricao), categoria = VALUES(categoria), familia = VALUES(familia), gera_pre_alerta = VALUES(gera_pre_alerta), hora_real_entrega = VALUES(hora_real_entrega), dados_do_recebedor_na_baixa = VALUES(dados_do_recebedor_na_baixa), entrega_externa = VALUES(entrega_externa), entrega_com_imagem = VALUES(entrega_com_imagem);";
}