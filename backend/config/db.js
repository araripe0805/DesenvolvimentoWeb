// backend/config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Altere se o seu utilizador do MySQL for diferente
  password: '',  // Insira a sua senha do MySQL aqui
  database: 'quadras_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao banco de dados quadras_db com sucesso!');
});

module.exports = connection;