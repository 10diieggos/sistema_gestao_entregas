// Arquivo utils.js
export default function extractIdObjetos(inputText) {
  // Tratar o valor do inputText para extrair o id_objetos da lista de codigos fornecida
  return inputText.split(',').map(item => item.trim()).join('\n');
}
