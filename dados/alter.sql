-- DROP TABLE objetos_destinatarios;
-- DROP TABLE destinatarios_contatos;
-- DROP TABLE destinatarios_enderecos;
-- DROP TABLE recebedores_destinatarios;
-- DROP TABLE Destinatarios;
ALTER TABLE objetos
ADD destinatario VARCHAR(100) DEFAULT NULL,
  ADD endereco VARCHAR(100) DEFAULT NULL,
  ADD num_endereco INT DEFAULT NULL,
  ADD distribuicao ENUM('E', 'I') DEFAULT NULL;
ALTER TABLE objetos_recebedores
ADD formal TINYINT(1) DEFAULT NULL;
ALTER TABLE recebedores DROP COLUMN formal;
ALTER TABLE `listas`
MODIFY `numero` CHAR(12) DEFAULT NULL;
ALTER TABLE `objetos`
MODIFY `duplicado` TINYINT(1) DEFAULT 0;
UPDATE objetos
SET duplicado = 0
WHERE duplicado IS NULL;
ALTER TABLE `objetos`
MODIFY `distribuicao` ENUM('E', 'I') DEFAULT 'I';
UPDATE objetos
SET distribuicao = 'I'
WHERE distribuicao IS NULL;
ALTER TABLE `objetos`
MODIFY `num_endereco` INT DEFAULT 0;
ALTER TABLE eventos
  RENAME COLUMN id_objetos TO id_objeto;
ALTER TABLE eventos DROP COLUMN momento_consulta;
ALTER TABLE recebedores
ADD UNIQUE (cpf);
DROP TABLE recebedores_contatos;
DROP TABLE recebedores_enderecos;
ALTER TABLE objetos DROP COLUMN id_recebedor;
DROP TABLE contatos;
ALTER TABLE objetos DROP COLUMN destinatario;
ALTER TABLE objetos
ADD criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ADD atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE servicos
ADD criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ADD atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE listas
ADD criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ADD atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE recebedores
ADD criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ADD atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE servicos
  RENAME TO servicos;
ALTER TABLE objetos
  RENAME TO objetos;
ALTER TABLE listas
  RENAME TO listas;
ALTER TABLE recebedores
  RENAME TO recebedores;
ALTER TABLE contatos
  RENAME TO contatos;
ALTER TABLE eventos
  RENAME TO eventos;