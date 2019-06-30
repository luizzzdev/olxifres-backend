import UsuarioModel from '../models/Usuario';
import { Database } from '../database';

export default class UsuarioController {
  async login(request, response, next) {
    const { email, senha } = request.body;

    const data: { results: []; total: number } = await Database.query(
      'SELECT * FROM usuario WHERE email = ? AND senha = ?',
      [email, senha]
    );

    if (data.total > 0) {
      return response.json(data);
    }

    return response.status(404).json({ error: 'Usuário ou senha incorretos!' });
  }

  async cadastrar(request, response, next) {
    const usuario = request.body;

    const usuarioModel = new UsuarioModel();

    const usuarioJaExiste = await usuarioModel.usuarioJaCadastrado(usuario.email);

    if (usuarioJaExiste) {
      return response.status(409).json({ error: 'Usuário já cadastrado!' });
    }

    const campos = Object.keys(usuario);
    const valores = Object.values(usuario);

    let data;
    try {
      data = await Database.insert('usuario', campos, valores);
    } catch (err) {
      console.log(err);
    }

    return response.status(201).json(data);
  }
}
