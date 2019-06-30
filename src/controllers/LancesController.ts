import util from '../util';
import Lance from '../models/Lance';

export default class LancesController {
  async criarLance(request, response, next) {
    const { idLeilao } = request.params;
    const { valor, idUsuario } = request.body;

    await new Lance().criarLance(idLeilao, idUsuario, util.getData(), valor);

    return response.status(201).json({ created: 'ok' });
  }
}
