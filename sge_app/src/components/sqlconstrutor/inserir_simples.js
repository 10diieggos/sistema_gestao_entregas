export default function inserir_simples(inputText) {
  let lines = inputText.trim().split('\n');
  let values = lines.map(line => {
      let [ordem, nome, endereco, num_endereco] = line.split('\t');
      num_endereco = isNaN(parseInt(num_endereco)) ? 0 : parseInt(num_endereco);
      return `('${ordem}','${nome}','${endereco}',${num_endereco}, 1)`;
  });
  return `INSERT INTO simples (ordem, destinatario, endereco, num_endereco, disponivel) VALUES ${values.join(',\n')};`;
}