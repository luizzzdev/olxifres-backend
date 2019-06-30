import Model from './Model';
import { Database } from '../database';
export default class Usuario extends Model {
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
}
