export default function select_ids_objeto_servico(inputText) {
  const codigos = inputText.trim().split('\n');
  const codigoList = codigos.map(c => `'${c}'`).join(',\n ');
  return `SELECT o.codigo, o.id as id_objeto, s.id as id_servico 
    FROM objetos o 
    JOIN servicos s ON SUBSTR(o.codigo, 1, 2) = s.sigla 
    WHERE o.codigo IN (${codigoList});`;
}