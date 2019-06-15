import mysql from 'mysql';

const asArray = value => (Array.isArray(value) ? value : [value]);

export class ConnectionFactory {
  static getConnection() {
    let connection;

    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect();

    return connection;
  }
}

export class Database {
  static query(query: string, params: any | any[] = null): Promise<{ results: []; total: number }> {
    const connection = ConnectionFactory.getConnection();

    return new Promise((resolve, reject) => {
      connection.query(query, asArray(params), (err, results) => {
        if (err) {
          connection.end();
          return reject({ error: err.stackTrace, sql: err.sql });
        }
        connection.end();
        return resolve({ data: results, total: results.length });
      });
    });
  }

  static insert(tabela: string, campos: string[], valores: any[] = []) {
    const sql = `INSERT INTO ${tabela}(${campos.join(', ')}) VALUES (${valores.map(val => '?').join(' ,')})`;

    return this.query(sql, valores);
  }
}
