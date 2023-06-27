export default function insere_recebedores(dados) {
  let lines = dados.trim().split('\n');
  let recebedores = [];
  let objetos_recebedores = [];
  let contatos = [];
  let objetos_contatos = [];
  let objetos = [];

  for (let line of lines) {
      let [data_hora_real_entrega, codigo, cpf, nome, telefone, formal] = line.split('\t');
      recebedores.push(`('${cpf}', '${nome}')`);
      objetos_recebedores.push(`((SELECT id FROM objetos WHERE codigo = '${codigo}'), (SELECT id FROM recebedores WHERE cpf = '${cpf}'), ${formal})`);
      if (telefone) {
          contatos.push(`('${telefone}')`);
          objetos_contatos.push(`((SELECT id FROM objetos WHERE codigo = '${codigo}'), (SELECT id FROM contatos WHERE telefone = '${telefone}'))`);
      }
      objetos.push(`WHEN '${codigo}' THEN '${data_hora_real_entrega}'`);
  }

  let query_recebedores = `INSERT INTO recebedores (cpf, nome)
VALUES
  ${recebedores.join(',\n    ')}
ON DUPLICATE KEY UPDATE nome = VALUES(nome);

INSERT INTO objetos_recebedores (id_objeto, id_recebedor, formal)
VALUES
  ${objetos_recebedores.join(',\n    ')}
ON DUPLICATE KEY UPDATE formal = VALUES(formal);`;

  if (contatos.length > 0) {
      query_recebedores += `

INSERT INTO contatos (telefone)
VALUES
  ${contatos.join(',\n    ')}
ON DUPLICATE KEY UPDATE telefone = VALUES(telefone);

INSERT INTO objetos_contatos (id_objeto, id_contato)
VALUES
  ${objetos_contatos.join(',\n    ')}
ON DUPLICATE KEY UPDATE id_contato = VALUES(id_contato);`;
  }

  query_recebedores += `

UPDATE objetos
SET disponivel = 0,
  pendencia_baixa = 1,
  finalizado = 1,
  data_hora_real_entrega = CASE codigo
      ${objetos.join('\n        ')}
  END
WHERE codigo IN (
  ${lines.map(line => `'${line.split('\t')[1]}'`).join(',\n    ')});`;

  return query_recebedores;
}