CREATE TABLE Recebedores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cpf CHAR(11) NOT NULL,
  nome VARCHAR(100) NOT NULL
);
CREATE TABLE Servicos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  prazo_entrega_interna INT DEFAULT NULL,
  sigla CHAR(2) NOT NULL,
  admite_residuo TINYINT(1) DEFAULT NULL,
  descricao VARCHAR(100) DEFAULT NULL,
  categoria VARCHAR(100) DEFAULT NULL,
  familia VARCHAR(100) DEFAULT NULL,
  gera_pre_alerta TINYINT(1) DEFAULT NULL,
  hora_real_entrega TINYINT(1) DEFAULT NULL,
  dados_do_recebedor_na_baixa TINYINT(1) DEFAULT NULL,
  entrega_externa TINYINT(1) DEFAULT NULL,
  entrega_com_imagem TINYINT(1) DEFAULT NULL,
  tentativas_previstas INT DEFAULT NULL,
  UNIQUE (sigla)
);
CREATE TABLE Objetos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  codigo CHAR(13) NOT NULL,
  ordem INT DEFAULT NULL,
  disponivel TINYINT(1) DEFAULT NULL,
  pendencia_baixa TINYINT(1) DEFAULT NULL,
  duplicado TINYINT(1) DEFAULT NULL,
  tentativas_restantes INT DEFAULT NULL,
  UNIQUE (codigo),
  id_servico INT,
  id_recebedores INT,
  FOREIGN KEY (id_servico) REFERENCES Servicos(id),
  FOREIGN KEY (id_recebedores) REFERENCES Recebedores(id)
);
CREATE TABLE Eventos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  momento_consulta DATETIME DEFAULT NULL,
  situacao VARCHAR(100) DEFAULT NULL,
  data_hora DATETIME DEFAULT NULL,
  local VARCHAR(100) DEFAULT NULL,
  mensagem VARCHAR(200) DEFAULT NULL,
  id_objetos INT,
  FOREIGN KEY (id_objetos) REFERENCES Objetos(id)
);
CREATE TABLE Listas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  data_Hora DATETIME DEFAULT NULL,
  numero INT,
  modalidade ENUM('LOEC', 'LDI') DEFAULT NULL,
  UNIQUE (numero)
);
CREATE TABLE Enderecos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  logradouro VARCHAR(100) DEFAULT NULL,
  numero INT DEFAULT NULL,
  existe_numero TINYINT(1) DEFAULT NULL,
  previsao_entrega_externa TINYINT(1) DEFAULT NULL,
  municipio VARCHAR(100) DEFAULT NULL,
  estado CHAR(2) DEFAULT NULL,
  bairro VARCHAR(100) DEFAULT NULL,
  CEP INT DEFAULT NULL
);
CREATE TABLE Destinatarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) DEFAULT NULL
);
CREATE TABLE Contatos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  telefone INT
);
CREATE TABLE objetos_destinatarios (
  id_objeto INT,
  id_destinatario INT,
  PRIMARY KEY (id_objeto, id_destinatario),
  FOREIGN KEY (id_objeto) REFERENCES Objetos(id),
  FOREIGN KEY (id_destinatario) REFERENCES Destinatarios(id)
);
CREATE TABLE destinatarios_contatos (
  id_destinatario INT,
  id_contato INT,
  PRIMARY KEY (id_destinatario, id_contato),
  FOREIGN KEY (id_destinatario) REFERENCES Destinatarios(id),
  FOREIGN KEY (id_contato) REFERENCES Contatos(id)
);
CREATE TABLE objetos_enderecos (
  id_objeto INT,
  id_endereco INT,
  PRIMARY KEY (id_objeto, id_endereco),
  FOREIGN KEY (id_objeto) REFERENCES Objetos(id),
  FOREIGN KEY (id_endereco) REFERENCES Enderecos(id)
);
CREATE TABLE destinatarios_enderecos (
  id_destinatario INT,
  id_endereco INT,
  PRIMARY KEY (id_destinatario, id_endereco),
  FOREIGN KEY (id_destinatario) REFERENCES Destinatarios(id),
  FOREIGN KEY (id_endereco) REFERENCES Enderecos(id)
);
CREATE TABLE objetos_listas (
  id_objeto INT,
  id_lista INT,
  posicao_objeto INT,
  PRIMARY KEY (id_objeto, id_lista),
  FOREIGN KEY (id_objeto) REFERENCES Objetos(id),
  FOREIGN KEY (id_lista) REFERENCES Listas(id)
);