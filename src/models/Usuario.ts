import { Database } from '../database';

export default class Usuario {
  async usuarioJaCadastrado(email: string) {
    const data = await Database.query('SELECT * FROM usuario WHERE email = ?', [email]);

    return data.total > 0;
  }

  login(email: string, senha: string) {
    return Database.query('SELECT * FROM usuario WHERE email = ? AND senha = ?', [email, senha]);
  }

  async cadastrar(body) {
    const usuarioJaExiste = await this.usuarioJaCadastrado(body.email);

    if (usuarioJaExiste) {
      return { error: 'Usuário já cadastrado!'}
    }

    const campos = Object.keys(body);
    const valores = Object.values(body);

    return Database.insert('usuario', campos, valores);
  }
}
