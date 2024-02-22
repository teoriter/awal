const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('index.html', 'index.html');

const db = mysql.createConnection({
  host: 'localhost',
  database: 'lojin',
  user: 'root',
  password: '',
});

db.connect((err) => {
  if (err) throw err;
  console.log('database connected...');

  app.get('/', (req, res) => {
    const sql = 'SELECT * FROM lojin';
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      res.render('index', { users: users, title: 'komentar' });
    });
  });

  app.post('/tambah', (req, res) => {
    const insertSql = `INSERT INTO lojin (nama, komentar) VALUES ('${req.body.nama}', '${req.body.komentar}')`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

app.listen(8000, () => {
  console.log('server ready...');
});
