import { Database } from '../database';

export default class Lance {
  criarLance(idLeilao, idUsuario, data, valor) {
    return Database.insert(
      'lance',
      ['id_leilao', 'id_usuario', 'data', 'valor'],
      [idLeilao, idUsuario, data, valor]
    );
  }
}