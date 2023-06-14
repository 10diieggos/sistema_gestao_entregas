export default function associar_objetos_listas(inputText) {
  const linhas = inputText.trim().split('\n');
  let query = 'INSERT INTO objetos_listas (id_objeto, id_lista, posicao_objeto) VALUES\n';
  query += linhas.map(linha => {
    const [codigo, numero, posicao_objeto] = linha.split('\t');
    return `((SELECT id FROM Objetos WHERE codigo = '${codigo}'), (SELECT id FROM Listas WHERE numero = '${numero}'), ${posicao_objeto || 'NULL'})`;
  }).join(',\n');
  query += '\nON DUPLICATE KEY UPDATE posicao_objeto = Values(posicao_objeto);';
  return query;
}