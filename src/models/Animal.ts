import { Database } from '../database';

export default class Animal {
  async criarAnimal(cor: string, peso: string, raca: string, fotoBase64: string, dataNascimento: string, idUsuario: number) {
    const data = await Database.insert(
      'animal',
      ['cor', 'peso', 'raca', 'foto', 'data_nascimento', 'id_usuario_dono'],
      [cor, peso, raca, fotoBase64, dataNascimento, idUsuario]
    );

    return data.data.insertId;
  }
}
