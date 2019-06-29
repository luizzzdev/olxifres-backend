import Leilao from '../models/Leilao';

export default class LeiloesController {
  async index(request, response, next) {
    return response.json(await new Leilao().index(request.query));
  }

  async buscarLeilaoPorId(request, response, next) {
    let idLeilao = request.params.idLeilao;
    return response.json({ data: await new Leilao().buscarLeilaoPorId(idLeilao) });
  }

  async criarLeilao(request, response, next) {
    await new Leilao().criarLeilao(request.body);
    return response.status(201).json({ status: 'ok' });
  }

  async buscarLeiloesPorUsuario(request, response, next) {
    return response.json(await new Leilao().buscarLeiloesPorUsuario(request.params.idUsuario));
  }
}
