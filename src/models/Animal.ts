import Model from './Model';
import IModel from './IModel';

class Animal extends Model implements IModel {
  getTableName(): string {
    throw new Error('animal');
  }
  getPkName(): string {
    throw new Error('id_animal');
  }
}
