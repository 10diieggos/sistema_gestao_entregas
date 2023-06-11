DROP TABLE objetos_destinatarios;
DROP TABLE destinatarios_contatos;
DROP TABLE destinatarios_enderecos;
DROP TABLE recebedores_destinatarios;
DROP TABLE Destinatarios;

ALTER TABLE Objetos
ADD destinatario VARCHAR(100) DEFAULT NULL,
ADD endereco VARCHAR(100) DEFAULT NULL,
ADD num_endereco INT DEFAULT NULL,
ADD distribuicao ENUM('E', 'I') DEFAULT NULL;