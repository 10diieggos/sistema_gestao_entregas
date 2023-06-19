export default function select_id_listas(inputText) {
  const lines = inputText.trim().split('\n');
  const numeros = lines.map((line) => line.trim());
  const numerosList = numeros.map((numero) => `'${numero}'`).join(',\n');
  return `SELECT numero, id FROM listas WHERE numero IN (${numerosList});`;
}