import { Database } from '../database';

export default class Usuario {
  getTableName(): string {
    throw new Error('usuario');
  }

  getPkName(): string {
    throw new Error('id_usuario');
  }

  async usuarioJaCadastrado(email: string) {
    const data = await Database.query('SELECT * FROM usuario WHERE email = ?', [email]);

    return data.total > 0;
  }

  async login(email, senha) {
    const data = await Database.query('SELECT * FROM usuario WHERE email = ? AND senha = ?', [email, senha]);

    if (data.total > 0) {
      return data;
    }

    return { error: 'Usuário ou senha incorretos!' };
  }

  async cadastrar(usuario) {
    const usuarioJaExiste = await this.usuarioJaCadastrado(usuario.email);

    if (usuarioJaExiste) {
      return { error: 'Usuário já cadastrado!' };
    }

    const campos = Object.keys(usuario);
    const valores = Object.values(usuario);

    return Database.insert('usuario', campos, valores);
  }
}
