export default function insere_listas(inputText) {
  const lines = inputText.trim().split('\n');
  const values = lines.map((line) => {
    const [data, hora, numero, modalidade] = line.trim().split(/\s+/);
    const dateTime = `${data} ${hora}`;
    return `('${dateTime}','${numero}','${modalidade}')`;
  });
  return `INSERT INTO listas (data_hora, numero, modalidade) VALUES ${values.join(',\n')}\nON DUPLICATE KEY UPDATE data_hora = VALUES(data_hora), modalidade = VALUES(modalidade);`;
}