export default function associar_objetos_listas(inputText) {
  const linhas = inputText.trim().split('\n');
  let query = 'INSERT INTO objetos_listas (id_objeto, id_lista, posicao_objeto)\n';
  query += linhas.map(linha => {
    const [codigo, numero, posicao_objeto] = linha.split('\t');
    return `SELECT (SELECT id FROM Objetos WHERE codigo = '${codigo}'), (SELECT id FROM Listas WHERE numero = '${numero}'), ${posicao_objeto}`;
  }).join('\nUNION ALL\n');
  query += ';';
  return query;
}