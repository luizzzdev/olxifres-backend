import Usuario from '../models/Usuario';

export default class UsuarioController {
  async login(request, response, next) {
    const { email, senha } = request.body;
    const usuario = await new Usuario().login(email, senha);
    if (usuario.total > 0) {
      return response.json(usuario);
    }

    return response.status(404).json({ error: 'Usuário ou senha incorretos!' });
  }

  async cadastrar(request, response, next) {
    const usuario = await new Usuario().cadastrar(request.body);

    if ('error' in usuario) {
      return response.status(409).json({ error: 'Usuário já cadastrado!' });
    }

    return response.status(201).json(usuario);
  }
}
