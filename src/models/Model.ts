import { query } from '../database';
import IModel from './IModel';

export default abstract class Model implements IModel {
  abstract getTableName(): string;
  abstract getPkName(): string;

  public query(query: string, params: any | any[]): Promise<[]> {
    return query(query, params);
  }

  getById(id: number): Promise<[]> {
    return query(`SELECT * FROM ${this.getTableName()} WHERE ${this.getPkName()} = ?`, id);
  }
}
