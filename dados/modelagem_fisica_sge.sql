CREATE TABLE servicos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  prazo_guarda_interna INT DEFAULT NULL,
  admite_residuo TINYINT(1) DEFAULT NULL,
  tentativas_externas_previstas INT DEFAULT NULL,
  sigla CHAR(2) NOT NULL,
  descricao VARCHAR(100) DEFAULT NULL,
  categoria VARCHAR(100) DEFAULT NULL,
  familia VARCHAR(100) DEFAULT NULL,
  gera_pre_alerta TINYINT(1) DEFAULT NULL,
  hora_real_entrega TINYINT(1) DEFAULT NULL,
  dados_do_recebedor_na_baixa VARCHAR(100) DEFAULT NULL,
  entrega_externa TINYINT(1) DEFAULT NULL,
  entrega_com_imagem TINYINT(1) DEFAULT NULL,
  criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (sigla)
);
CREATE TABLE objetos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  codigo CHAR(13) NOT NULL,
  ordem INT DEFAULT NULL,
  destinatario VARCHAR(100) NOT NULL,
  endereco VARCHAR(100) DEFAULT NULL,
  num_endereco INT DEFAULT NULL,
  distribuicao ENUM('E', 'I')  DEFAULT 'I',
  duplicado TINYINT(1) DEFAULT 0,
  id_servico INT,
  disponivel TINYINT(1) DEFAULT NULL,
  pendencia_baixa TINYINT(1) DEFAULT NULL,
  tentativas_restantes INT DEFAULT NULL,
  criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (codigo),
  FOREIGN KEY (id_servico) REFERENCES servicos(id)
);
CREATE TABLE listas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  data_Hora DATETIME DEFAULT NULL,
  numero CHAR(12) DEFAULT NULL,
  modalidade ENUM('LOEC', 'LDI') DEFAULT NULL,
  criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (numero)
);
CREATE TABLE objetos_listas (
  id_objeto INT,
  id_lista INT,
  posicao_objeto INT,
  PRIMARY KEY (id_objeto, id_lista),
  FOREIGN KEY (id_objeto) REFERENCES objetos(id),
  FOREIGN KEY (id_lista) REFERENCES listas(id)
);
CREATE TABLE recebedores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cpf CHAR(11),
  nome VARCHAR(100) NOT NULL,
  criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (cpf)
);
CREATE TABLE objetos_recebedores (
  id_objeto INT,
  id_recebedor INT,
  formal TINYINT(1) DEFAULT NULL,
  PRIMARY KEY (id_objeto, id_recebedor),
  FOREIGN KEY (id_objeto) REFERENCES objetos(id),
  FOREIGN KEY (id_recebedor) REFERENCES recebedores(id)
);
CREATE TABLE contatos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  telefone CHAR(11),
  UNIQUE (telefone)
);
CREATE TABLE objetos_contatos (
  id_objeto INT,
  id_contato INT,
  PRIMARY KEY (id_objeto, id_contato),
  FOREIGN KEY (id_objeto) REFERENCES objetos(id),
  FOREIGN KEY (id_contato) REFERENCES contatos(id)
);
CREATE TABLE eventos (
  id_objeto INT,
  data_hora DATETIME,
  local VARCHAR(100) DEFAULT NULL,
  situacao VARCHAR(100) DEFAULT NULL,
  mensagem VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (id_objeto, data_hora),
  FOREIGN KEY (id_objeto) REFERENCES objetos(id)
);
-- CREATE TABLE Destinatarios (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   cpf CHAR(11),
--   nome VARCHAR(100) NOT NULL,
--   telefone CHAR(11) DEFAULT NULL
-- );
-- CREATE TABLE objetos_destinatarios (
--   id_objeto INT,
--   id_destinatario INT,
--   PRIMARY KEY (id_objeto, id_destinatario),
--   FOREIGN KEY (id_objeto) REFERENCES objetos(id),
--   FOREIGN KEY (id_destinatario) REFERENCES Destinatarios(id)
-- );
-- CREATE TABLE Enderecos (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   logradouro VARCHAR(100) DEFAULT NULL,
--   numero INT DEFAULT NULL,
--   existe_numero TINYINT(1) DEFAULT NULL,
--   previsao_entrega_externa TINYINT(1) DEFAULT NULL,
--   municipio VARCHAR(100) DEFAULT NULL,
--   estado CHAR(2) DEFAULT NULL,
--   bairro VARCHAR(100) DEFAULT NULL,
--   CEP CHAR(8) DEFAULT NULL
-- );
-- CREATE TABLE objetos_enderecos (
--   id_objeto INT,
--   id_endereco INT,
--   PRIMARY KEY (id_objeto, id_endereco),
--   FOREIGN KEY (id_objeto) REFERENCES objetos(id),
--   FOREIGN KEY (id_endereco) REFERENCES Enderecos(id)
-- );

-- CREATE TABLE destinatarios_contatos (
--   id_destinatario INT,
--   id_contato INT,
--   PRIMARY KEY (id_destinatario, id_contato),
--   FOREIGN KEY (id_destinatario) REFERENCES Destinatarios(id),
--   FOREIGN KEY (id_contato) REFERENCES contatos(id)
-- );
-- CREATE TABLE destinatarios_enderecos (
--   id_destinatario INT,
--   id_endereco INT,
--   PRIMARY KEY (id_destinatario, id_endereco),
--   FOREIGN KEY (id_destinatario) REFERENCES Destinatarios(id),
--   FOREIGN KEY (id_endereco) REFERENCES Enderecos(id)
-- );
-- CREATE TABLE recebedores_enderecos (
--   id_recebedor INT,
--   id_endereco INT,
--   PRIMARY KEY (id_recebedor, id_endereco),
--   FOREIGN KEY (id_recebedor) REFERENCES recebedores(id),
--   FOREIGN KEY (id_endereco) REFERENCES Enderecos(id)
-- );
-- CREATE TABLE recebedores_contatos (
--   id_recebedor INT,
--   id_contato INT,
--   PRIMARY KEY (id_recebedor, id_contato),
--   FOREIGN KEY (id_recebedor) REFERENCES recebedores(id),
--   FOREIGN KEY (id_contato) REFERENCES contatos(id)
-- );
-- CREATE TABLE recebedores_destinatarios (
--   id_recebedor INT,
--   id_destinatario INT,
--   PRIMARY KEY (id_recebedor, id_destinatario),
--   FOREIGN KEY (id_recebedor) REFERENCES recebedores(id),
--   FOREIGN KEY (id_destinatario) REFERENCES Destinatarios(id)
-- );
