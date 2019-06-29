import { Database } from '../database';
import Lance from './Lance';
import Animal from './Animal';
import moment from 'moment';

const fs = require('fs');

export default class Leilao {
  async index(query) {
    let sql = 'SELECT * FROM leilao l INNER JOIN animal a ON l.id_animal = a.id_animal';
    let options = ' ORDER BY l.data';
    const conditions: string[] = [];

    if (query.status) {
      conditions.push(` l.status = ${query.status}`);
    }

    if (query.idLeilao) {
      conditions.push(` l.id_leilao = ${query.idLeilao}`);
    }

    if ('status' in query || 'idLeilao' in query) {
      sql += ' WHERE';
      sql += conditions.join(' AND ');
    }

    if (query.limit) {
      options += ` LIMIT ${query.limit}`;
    }

    return Database.query(sql + options);
  }

  async criarLeilao(body) {
    let { dataNascimento, dataFim } = body;
    const { cor, lanceMinimo, peso, raca, idUsuario } = body;

    let fotoBase64 = null;
    if (body.file) {
      fotoBase64 = new Buffer(fs.readFileSync(body.file.path)).toString('base64');
    }

    const idAnimal = await new Animal().criarAnimal(cor, peso, raca, fotoBase64, moment(dataNascimento).format('YYYY-MM-DD'));

    await Database.insert(
      'leilao',
      ['data', 'id_animal', 'lance_minimo', 'status', 'id_usuario_vendedor'],
      [moment().format('YYYY-MM-DD'), idAnimal, lanceMinimo, 1, idUsuario]
    );
  }

  buscarLeiloesPorUsuario(idUsuario: string) {
    let sql = 'select * from animal a inner join leilao l on l.id_animal = a.id_animal where a.id_usuario_dono in (select l.id_usuario_vendedor from leilao l where l.id_usuario_vendedor = ?)';

    return Database.query(sql, idUsuario);
  }


  async buscarLeilaoPorId(idLeilao: number) {
    let sql = 'SELECT * FROM leilao l INNER JOIN animal a ON l.id_animal = a.id_animal WHERE l.id_leilao = ?';
    const data = await Database.query(sql, idLeilao);
    const leilao = data.data.find(leilao => (leilao.id_leilao == idLeilao));
    const lances = await new Lance().buscarLancesPorIdLeilao(leilao.id_leilao);
    leilao.lances = lances;
    return leilao;
  }
}