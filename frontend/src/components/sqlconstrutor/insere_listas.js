export default function insere_listas(inputText) {
  const lines = inputText.trim().split('\n');
  const values = lines.map((line) => {
    const [data, hora, numero, modalidade] = line.trim().split(/\s+/);
    const dateTime = `${data} ${hora}`;
    return `('${dateTime}','${numero}','${modalidade}')`;
  });
  return `INSERT INTO Listas (data_hora, numero, modalidade) VALUES ${values.join(',\n')};`;
}