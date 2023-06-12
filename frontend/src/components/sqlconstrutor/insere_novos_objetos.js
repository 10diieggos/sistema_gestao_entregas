export default function insere_novos_objetos(inputText) {
    // quebra a string em linhas
    const linhas = inputText.split('\n');
    let query = "INSERT INTO Objetos (codigo, ordem, destinatario, endereco, num_endereco, distribuicao, duplicado, id_servico, disponivel, tentativas_restantes)\nVALUES\n";
    for (let i = 0; i < linhas.length; i++) {
      // quebra a linha em campos
      const campos = linhas[i].split('\t');
      if (campos.length === 7) {
        const codigo = campos[0];
        const ordem = campos[1];
        const destinatario = campos[2];
        const endereco = campos[3];
        const num_endereco = campos[4];
        const distribuicao = campos[5];
        const duplicado = campos[6];
        const sigla = codigo.substring(0, 2);
        let id_servico_query = `(SELECT id FROM Servicos WHERE sigla = '${sigla}')`;
        let tentativas_restantes_query = '0';
        if (distribuicao === 'E') {
          tentativas_restantes_query = `(SELECT tentativas_externas_previstas FROM Servicos WHERE sigla = '${sigla}')`;
        }
        query += `('${codigo}', ${ordem}, '${destinatario}', '${endereco}', ${num_endereco}, '${distribuicao}', ${duplicado}, ${id_servico_query}, 1, ${tentativas_restantes_query}),\n`;
      }
    }
    // remove a vírgula extra no final e adiciona ponto e vírgula no final da query
    query = query.slice(0, -2) + ';';
    return query;
  }