DROP DATABASE IF EXISTS olxifres;
CREATE DATABASE olxifres;
USE olxifres;

CREATE TABLE usuario(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    senha VARCHAR(255),
    email VARCHAR(255),
    logradouro VARCHAR(255),
    numero INT,
    bairro VARCHAR(255),
    cep INT,
    cidade VARCHAR(255),
    estado CHAR(2),
    cpf VARCHAR(11),
    telefone VARCHAR(255)
);

CREATE TABLE animal(
    id_animal INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_dono INT,
    raca VARCHAR(255),
    peso VARCHAR(255),
    cor VARCHAR(255),
    foto LONGTEXT,
    data_nascimento DATE,
    FOREIGN KEY(id_usuario_dono) REFERENCES usuario(id_usuario)
);

CREATE TABLE leilao(
    id_leilao INT AUTO_INCREMENT PRIMARY KEY,
    data DATE,
    id_animal INT,
    lance_minimo DOUBLE,
    id_usuario_vendedor INT,
    FOREIGN KEY(id_animal) REFERENCES animal(id_animal),
    FOREIGN KEY(id_usuario_vendedor) REFERENCES usuario(id_usuario)
);

CREATE TABLE lance(
    id_lance INT AUTO_INCREMENT PRIMARY KEY,
    id_leilao INT,
    id_usuario INT,
    data DATETIME,
    valor DOUBLE,
    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario)
);

CREATE VIEW vw_leilao AS
    SELECT l.*, (case when l.data > now() then 0 else 1 end) as status FROM leilao l;