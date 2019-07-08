import { Database } from '../database';
import moment from 'moment';
import Animal from './Animal';

const fs = require('fs');

export default class Leilao {
  index(query) {
    let sql = 'SELECT * FROM vw_leilao l INNER JOIN animal a ON l.id_animal = a.id_animal';
    let options = ' ORDER BY l.data';
    const conditions: string[] = [];

    if ('status' in query) {
      conditions.push(` l.status = ${query.status}`);
    }

    if ('idLeilao' in query) {
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

    let fotoBase64 = new Buffer(fs.readFileSync(body.file.path)).toString('base64');

    const idAnimal = await new Animal().criarAnimal(
      cor,
      peso,
      raca,
      fotoBase64,
      moment(dataNascimento).format('YYYY-MM-DD'),
      +idUsuario,
    );

    await Database.insert(
      'leilao',
      ['data', 'id_animal', 'lance_minimo'],
      [moment(dataFim).format('YYYY-MM-DD'), idAnimal, lanceMinimo]
    );
  }

  async buscarLeilaoPorId(idLeilao: number) {
    let sql = 'SELECT * FROM vw_leilao l INNER JOIN animal a ON l.id_animal = a.id_animal WHERE l.id_leilao = ?';

    const data = await Database.query(sql, idLeilao);

    const leilao = data.data.find(leilao => leilao.id_leilao == idLeilao);

    sql = 'SELECT * FROM lance WHERE id_leilao = ? ORDER BY data DESC';
    const lances = await Database.query(sql, idLeilao);

    leilao.lances = lances.data;

    return leilao;
  }

  buscarLeiloesPorUsuario(idUsuario: number) {
    const sql =
      'select * from animal a inner join vw_leilao l on l.id_animal = a.id_animal where a.id_usuario_dono in (select l.id_usuario_vendedor from vw_leilao l where l.id_usuario_vendedor = ?)';
    return Database.query(sql, idUsuario);
  }
}
