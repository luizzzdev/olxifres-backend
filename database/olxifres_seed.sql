INSERT INTO usuario
  (nome, senha, email, logradouro, numero, bairro, cep, cidade, estado, cpf, telefone)
values
  ("Lukas Rodrigo", "lukas123", "lukasrar@hotmail.com", "Rua Joaquim Silva Carvalho", 87, "Segismundo Pereira",
    "38408304",
    "Uberlandia", "MG", "38064603021", 992221743),
  ("José Neto", "neto123", "joseneto@hotmail.com", "Av. Nicomedes Alves dos Santos", 2222, "Altamira", "38411106",
    "Uberlandia", "MG", "71814948058", 992221922),
  ("Luiz Fernando", "luiz123", "luiz.fernando@hotmail.com", "Av. Dr. Misael Rodrigues de Castro", 463,
    "Santa Monica", "38400126",
    "Uberlandia", "MG", "43011036004", 992222012),
  ("Iago Nunes", "iago123", "iago.nunes@hotmail.com", "Av. Vasconcelos Costa", 159, "Martins", "38400448",
    "Uberlandia", "MG", "26658255032", 999238912),
  ("Patrick Freitas", "patrick123", "patrick.freitas@hotmail.com", "Av. Fernando Vilela", 580, "Martins",
    "38400456",
    "Uberlandia", "MG", "66562960096", 992323132);

INSERT INTO animal
  (id_usuario_dono, raca, peso, cor, data_nascimento)
VALUES
  (1, 'Quarto de Milha', '400kg', 'Tordilho', '2018-03-12'),
  (2, 'Mustangue', '433kg', 'Tostado', '2016-04-11'),
  (3, 'Shire', '531kg', 'Ruão Vermelho', '2015-11-11'),
  (4, 'Bretão', '640kg', 'Alazão', '2017-01-12'),
  (1, 'Quarto de Milha', '400kg', 'Tordilho', '2017-07-22'),
  (2, 'Mustangue', '700kg', 'Tostado', '2016-12-26'),
  (3, 'Shire', '800kg', 'Ruão Vermelho', '2018-05-11'),
  (4, 'Bretão', '640kg', 'Alazão', '2017-01-12'),
  (5, 'Nokota', '453kg', 'Baio Claro', '2016-08-11');

INSERT INTO leilao
  (data, id_animal, lance_minimo, status, id_usuario_vendedor)
VALUES
  ("2018-05-22", 1, 2000, 1, 1),
  ("2018-05-20", 2, 3000, 0, 1),
  ("2018-05-12", 4, 1500, 1, 2),
  ("2018-05-22", 5, 7000, 0, 1),
  ("2018-05-12", 1, 1000, 1, 1),
  ("2018-05-11", 2, 3000, 0, 1),
  ("2018-05-14", 4, 1500, 1, 2),
  ("2018-05-25", 5, 5000, 0, 1),
  ("2018-05-22", 3, 1000, 1, 3);
  

INSERT INTO lance
  (id_leilao, id_usuario, data, valor)
VALUES
  (1, 1, '2001-01-01', 23123.21),
  (3, 3, '2002-02-02', 232.21),
  (4, 4, '2003-03-03', 324.50),
  (2, 2, '2004-04-04', 1231242),
  (5, 5, '2005-05-05', 8976);