import { Database } from '../database';
import util from '../util';

export default class LancesController {
  async darLance(request, response, next) {
    const { idLeilao } = request.params;
    const { valor, idUsuario } = request.body;

    await Database.insert(
      'lance',
      ['id_leilao', 'id_usuario', 'data', 'valor'],
      [idLeilao, idUsuario, util.getData(), valor]
    );

    return response.status(201).json({ created: 'ok' });
  }
}
