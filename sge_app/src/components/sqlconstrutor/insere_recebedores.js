export default function insere_recebedores(inputText) {
    // Dividir o texto de entrada em linhas
    const lines = inputText.trim().split('\n');
    // Remover a primeira linha (cabeçalho)
    lines.shift();
    // Inicializar variáveis para armazenar os valores a serem inseridos nas tabelas
    let recebedoresValues = [];
    let objetosRecebedoresValues = [];
    let contatosValues = [];
    let objetosContatosValues = [];
    let objetosUpdateValues = [];
    // Iterar sobre cada linha do texto de entrada
    for (const line of lines) {
        // Dividir a linha em colunas
        const columns = line.split('\t');
        // Extrair os valores das colunas
        const [hora, codigo, cpf, nome, telefone, formal] = columns;
        // Adicionar os valores às variáveis de armazenamento
        recebedoresValues.push(`('${cpf}','${nome}')`);
        objetosRecebedoresValues.push(`((SELECT id FROM objetos WHERE codigo = '${codigo}'), (SELECT id FROM recebedores WHERE cpf = '${cpf}'), ${formal}, '${hora}')`);
        if (telefone) {
            contatosValues.push(`('${telefone}')`);
            objetosContatosValues.push(`((SELECT id FROM objetos WHERE codigo = '${codigo}'), (SELECT id FROM contatos WHERE telefone = '${telefone}'))`);
        }
        if (!objetosUpdateValues.includes(codigo)) {
            objetosUpdateValues.push(`'${codigo}'`);
        }
    }
    // Construir a consulta
    let query = `INSERT INTO recebedores (cpf, nome)
VALUES
    ${recebedoresValues.join(',\n\t')}
ON DUPLICATE KEY UPDATE nome = VALUES(nome);

INSERT INTO objetos_recebedores (id_objeto, id_recebedor, formal, data_hora_real_entrega)
VALUES
    ${objetosRecebedoresValues.join(',\n\t')}
ON DUPLICATE KEY UPDATE formal = VALUES(formal);`;
    if (contatosValues.length > 0) {
        query += `

INSERT INTO contatos (telefone)
VALUES
    ${contatosValues.join(',\n\t')}
ON DUPLICATE KEY UPDATE telefone = VALUES(telefone);

INSERT INTO objetos_contatos (id_objeto, id_contato)
VALUES
    ${objetosContatosValues.join(',\n\t')}
ON DUPLICATE KEY UPDATE id_contato = VALUES(id_contato);`;
    }
    query += `

UPDATE objetos
SET disponivel = 0,
  finalizado = 1
WHERE codigo IN (
    ${objetosUpdateValues.join(',\n\t')});`;
    return query;
}