const mysql = require('mysql');

let connection;

const connectDatabase = () => {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect(function(err) {
    if (err) {
      console.error('Não foi possível conectar o banco de dados ' + err.stack);
      return;
    }

    console.log('Conectado ao banco de dados MySql!' + connection.threadId);
  });

  connection.query('SELECT NOW()', (error, results, fields) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log(results);
  });
};

connectDatabase();

export const query = (query: string, params: any | any[]): Promise<[]> => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, results, fields) => {
      if (err) reject(err);

      resolve({ results, fields });
    });
  });
};
