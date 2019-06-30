import { Database } from '../database';

export default class Animal {
  criarAnimal(cor: string, peso: string, raca: string, fotoBase64: string, dataNascimento: string) {
    return Database.insert(
      'animal',
      ['cor', 'peso', 'raca', 'foto', 'data_nascimento'],
      [cor, peso, raca, fotoBase64, dataNascimento]
    );
  }
}
