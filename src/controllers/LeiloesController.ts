import { Database } from '../database';
import moment from 'moment';

const fs = require('fs');

export default class LeiloesController {
  async index(request, response, next) {
    let sql = 'SELECT * FROM leilao l INNER JOIN animal a ON l.id_animal = a.id_animal';
    let options = ' ORDER BY l.data';
    const conditions: string[] = [];

    if (request.query.status) {
      conditions.push(` l.status = ${request.query.status}`);
    }

    if (request.query.idLeilao) {
      conditions.push(` l.id_leilao = ${request.query.idLeilao}`);
    }

    if ('status' in request.query || 'idLeilao' in request.query) {
      sql += ' WHERE';
      sql += conditions.join(' AND ');
    }

    if (request.query.limit) {
      options += ` LIMIT ${request.query.limit}`;
    }

    const data = await Database.query(sql + options);

    return response.json(data);
  }

  async buscarLeilaoPorId(request, response, next) {
    let idLeilao = request.params.idLeilao;
    let sql = 'SELECT * FROM leilao l INNER JOIN animal a ON l.id_animal = a.id_animal WHERE l.id_leilao = ?';

    const data = await Database.query(sql, idLeilao);

    const leilao = data.data.find(leilao => (leilao.id_leilao == idLeilao));

    sql = 'SELECT * FROM lance WHERE id_leilao = ?';
    const lances = await Database.query(sql, idLeilao);

    leilao.lances = lances.data.reverse();

    return response.json(data);
  }

  async criarLeilao(request, response, next) {
    let { dataNascimento, dataFim } = request.body;
    const { cor, lanceMinimo, peso, raca, idUsuario } = request.body;

    let fotoBase64 = null;
    if (request.file) {
      fotoBase64 = new Buffer(fs.readFileSync(request.file.path)).toString('base64');
    }

    const result = await Database.insert(
      'animal',
      ['cor', 'peso', 'raca', 'foto', 'data_nascimento'],
      [cor, peso, raca, fotoBase64, moment(dataNascimento).format('YYYY-MM-DD')]
    );

    const idAnimal = result.data.insertId;

    await Database.insert(
      'leilao',
      ['data', 'id_animal', 'lance_minimo', 'status', 'id_usuario_vendedor'],
      [moment().format('YYYY-MM-DD'), idAnimal, lanceMinimo, 1, idUsuario]
    );

    return response.status(201).json({ idAnimal });
  }

  async buscarLeiloesPorUsuario(request, response, next){
    let idUsuario = request.params.idUsuario;
    let sql = 'select * from animal a inner join leilao l on l.id_animal = a.id_animal where a.id_usuario_dono in (select l.id_usuario_vendedor from leilao l where l.id_usuario_vendedor = ?)';

    const data = await Database.query(sql, idUsuario);

    return response.json(data)
  }
}

