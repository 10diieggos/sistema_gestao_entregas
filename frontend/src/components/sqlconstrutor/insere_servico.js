export default function insere_servico(inputText) {
  let query = "INSERT INTO Servicos (prazo_guarda_interna, admite_residuo, tentativas_externas_previstas, sigla, descricao, categoria, familia, gera_pre_alerta, hora_real_entrega, dados_do_recebedor_na_baixa, entrega_externa, entrega_com_imagem) VALUES\n";

  for (let linha of inputText.split("\n")) {
    if (linha.trim() === "") continue;

    let campos = linha.split("\t");
    let valores = campos.slice(0, 10).map(valor => isNaN(valor) ? "'" + valor + "'" : valor).join(", ");
    valores += ", " + campos.slice(10).join(", ");
    query += "(" + valores + "),\n";
  }

  return query.slice(0, -2) + ";";
}