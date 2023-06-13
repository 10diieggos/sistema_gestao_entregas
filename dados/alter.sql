-- DROP TABLE objetos_destinatarios;
-- DROP TABLE destinatarios_contatos;
-- DROP TABLE destinatarios_enderecos;
-- DROP TABLE recebedores_destinatarios;
-- DROP TABLE Destinatarios;

ALTER TABLE Objetos
ADD destinatario VARCHAR(100) DEFAULT NULL,
ADD endereco VARCHAR(100) DEFAULT NULL,
ADD num_endereco INT DEFAULT NULL,
ADD distribuicao ENUM('E', 'I') DEFAULT NULL;

ALTER TABLE objetos_recebedores ADD formal TINYINT(1) DEFAULT NULL;
ALTER TABLE Recebedores DROP COLUMN formal;

ALTER TABLE `Listas` MODIFY `numero` CHAR(12) DEFAULT NULL;

ALTER TABLE `Objetos` MODIFY `duplicado` TINYINT(1) DEFAULT 0;
UPDATE Objetos SET duplicado = 0  WHERE duplicado IS NULL;

ALTER TABLE `Objetos` MODIFY `distribuicao` ENUM('E', 'I') DEFAULT 'I';
UPDATE Objetos SET distribuicao = 'I' WHERE distribuicao IS NULL;

ALTER TABLE `Objetos` MODIFY `num_endereco` INT DEFAULT 0;

ALTER TABLE Eventos RENAME COLUMN id_objetos TO id_objeto;

ALTER TABLE Eventos DROP COLUMN momento_consulta;

ALTER TABLE Recebedores ADD UNIQUE (cpf);

DROP TABLE recebedores_contatos;
DROP TABLE recebedores_enderecos;

ALTER TABLE Objetos DROP COLUMN id_recebedor;

DROP TABLE Contatos;

