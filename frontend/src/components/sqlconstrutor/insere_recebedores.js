export default function insere_recebedores(dados) {
  const linhas = dados.trim().split('\n');
  const recebedores = new Map();
  const contatos = new Set();
  const objetos = new Set();
  let query_recebedores = 'INSERT INTO Recebedores (cpf, nome)\nVALUES\n';
  let query_objetos_recebedores = 'INSERT INTO objetos_recebedores (id_objeto, id_recebedor, formal)\nVALUES\n';
  let query_contatos = 'INSERT INTO Contatos (telefone)\nVALUES\n';
  let query_objetos_contatos = 'INSERT INTO objetos_contatos (id_objeto, id_contato)\nVALUES\n';
  let query_update_objetos = 'UPDATE Objetos SET disponivel = 0, pendencia_baixa = 1 WHERE codigo IN (\n';

  for (const linha of linhas) {
    const [codigo, cpf, nome, telefone = '', formal = 1] = linha.trim().split('\t');
    objetos.add(codigo);
    recebedores.set(cpf, nome);
    if (cpf) {
      query_objetos_recebedores += `    ((SELECT id FROM Objetos WHERE codigo = '${codigo}'), (SELECT id FROM Recebedores WHERE cpf = '${cpf}'), ${formal}),\n`;
    }
    if (telefone) {
      contatos.add(telefone);
      query_objetos_contatos += `    ((SELECT id FROM Objetos WHERE codigo = '${codigo}'), (SELECT id FROM Contatos WHERE telefone = '${telefone}')),\n`;
    }
  }

  for (const [cpf, nome] of recebedores) {
    query_recebedores += `    ('${cpf}', '${nome}'),\n`;
  }

  for (const telefone of contatos) {
    query_contatos += `    ('${telefone}'),\n`;
  }

  for (const codigo of objetos) {
    query_update_objetos += `'${codigo}', `;
  }

  query_recebedores = query_recebedores.slice(0, -2) + '\nON DUPLICATE KEY UPDATE nome = VALUES(nome);\n\n';
  query_objetos_recebedores = query_objetos_recebedores.slice(0, -2) + ';\n';
  query_contatos = query_contatos.slice(0, -2) + '\nON DUPLICATE KEY UPDATE telefone = VALUES(telefone);\n\n';
  query_objetos_contatos = query_objetos_contatos.slice(0, -2) + ';\n';
  query_update_objetos = query_update_objetos.slice(0, -2) + ');\n';

  return query_recebedores + query_objetos_recebedores + query_contatos + query_objetos_contatos + query_update_objetos;
}