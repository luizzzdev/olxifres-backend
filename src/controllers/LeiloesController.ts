import { Database } from '../database';

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
}
