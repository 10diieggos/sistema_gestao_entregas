export default function insere_novos_objetos(inputText) {
  const lines = inputText.split('\n'); // separa as linhas do conjunto de dados
  
  let values = []; // array para armazenar os valores para cada linha
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() !== '') { // verifica se a linha não está vazia
      const columns = line.split('\t'); // separa as colunas da linha por tabulação
      
      // adiciona os valores da linha atual ao array de valores
      const valueString = `('${columns[0]}', ${columns[1]}, '${columns[2]}', '${columns[3]}', ${parseInt(columns[4], 10)}, '${columns[5]}', ${parseInt(columns[6], 10)})`;
      
      values.push(valueString);
    }
  }
  
  // constrói a consulta SQL de inserção com os valores das linhas
  const query = `INSERT INTO Objetos (codigo, ordem, destinatario, endereco, num_endereco, distribuicao, duplicado) VALUES ${values.join(', ')};`;
  
  return query;
}