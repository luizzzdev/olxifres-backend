import { Database } from '../database';

export default class Lance {
  async buscarLancesPorIdLeilao(idLeilao: string) {
    const sql = 'SELECT * FROM lance WHERE id_leilao = ? ORDER BY data DESC';
    const lances = await Database.query(sql, idLeilao);
    return lances.data;
  }

  criarLance(idLeilao, idUsuario, data, valor) {
    return Database.insert('lance', ['id_leilao', 'id_usuario', 'data', 'valor'], [idLeilao, idUsuario, data, valor]);
  }
}
