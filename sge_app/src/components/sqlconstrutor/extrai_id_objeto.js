export default function extrai_id_objeto(inputText) {
  const objetos = inputText.trim().split('\n'); // separa as linhas do conjunto de dados

  let updateQuery = 'UPDATE objetos o\nJOIN servicos s ON SUBSTR(o.codigo, 1, 2) = s.sigla\nSET o.id_servico = s.id WHERE\n';
  let selectQuery = 'SELECT o.codigo, o.id as id_objeto, o.id_servico\nFROM objetos o\nJOIN servicos s ON SUBSTR(o.codigo, 1, 2) = s.sigla\nWHERE\n';

  // adiciona as cláusulas WHERE para cada código de objeto
  for (let i = 0; i < objetos.length; i++) {
    const codigo = objetos[i].trim();
    if (codigo !== '') { // verifica se o código não está vazio
      updateQuery += `o.codigo = '${codigo}' OR\n`;
      selectQuery += `o.codigo = '${codigo}' OR\n`;
    }
  }

  // remove a última cláusula OR de cada consulta e adiciona um ponto-e-vírgula
  updateQuery = updateQuery.slice(0, -3) + ';';
  selectQuery = selectQuery.slice(0, -3) + ';';

  // retorna as consultas concatenadas em uma única string
  return updateQuery + '\n\n' + selectQuery;
}