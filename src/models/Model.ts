// import { query } from '../database';
import IModel from './IModel';

export default abstract class Model implements IModel {
  abstract getTableName(): string;
  abstract getPkName(): string;

  /**
   * @todo reimplementar este metodo
   */
  // getById(id: number): Promise<[]> {
  //   return query(`SELECT * FROM ${this.getTableName()} WHERE ${this.getPkName()} = ?`, id);
  // }
}
