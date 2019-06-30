import Leilao from '../models/Leilao'

export default class LeiloesController {
  async index(request, response, next) {
    return response.json(await new Leilao().index(request.query));
  }

  async buscarLeilaoPorId(request, response, next) {
    let idLeilao = request.params.idLeilao;
    return response.json(await new Leilao().buscarLeilaoPorId(idLeilao));
  }

  async criarLeilao(request, response, next) {
    if (request.file) {
      request.body.file = request.file;
    }

    await new Leilao().criarLeilao(request.body);
    return response.status(201).json({ created: 'ok' });

  }

  async buscarLeiloesPorUsuario(request, response, next){
    let idUsuario = request.params.idUsuario;
    return response.json(new Leilao().buscarLeiloesPorUsuario(idUsuario));
  }
}

