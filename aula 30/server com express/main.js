const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());
const port = 3001;

// Desafio
// Fazer todas as rotas do todo utilizando express

// FUTURO: Arquivos de ambiente development.env, production.env,...
// se quiser olhar o dotenv
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'listra'
});

app.use((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  req.next();
})

app.get('/todo', (request, response) => {
  let query = "SELECT * FROM todo";
  if (request.query.showDeleted != "1") {
    query += ' WHERE deleted_at IS NULL';
  }
  connection.query(query, (error, result) => {
    if (error) {
      response.status(404).send();
    } else {
      response.send(result);
    }
  });
});

app.get('/todo/:id', (request, response) => {
  let query = `SELECT * FROM todo WHERE id=${request.params.id}`;
  if (request.query.showDeleted != "1") {
    query += ' AND deleted_at IS NULL';
  }
  connection.query(query, (error, result) => {
    if (error) {
      response.status(404).send();
    } else {
      response.send(result);
    }
  });
});

app.delete('/todo/:id', (request, response) => {
  let query = `UPDATE todo SET deleted_at=NOW() WHERE id=${request.params.id}`;
  console.log(query);
  connection.query(query, (error, result) => {
      if (error) {
        response.status(404).send();
        console.log(error);
      } else {
        response.send(result);
      }
    });
});

app.put('/todo/:id', (request, response) => {
  const title = request.body.title
  const description = request.body.description
  const categoryId = request.body.categoryId

  if (title && description && categoryId) {
    let query = `UPDATE todo SET title='${title}', description='${description}', category_id=${categoryId}, update_at=NOW() WHERE id=${request.params.id}`;
    console.log(query);
    connection.query(query, (error, result) => {
      if (error) {
        response.status(404).send();
      } else {
        response.send(result);
      }
    });
  } else {
        response.statusCode = 400;
        response.end("BAD REQUEST");
      }
});

app.post('/todo', (request, response) => {
  const title = request.body.title
  const description = request.body.description
  const categoryId = request.body.categoryId
  let query = `INSERT INTO todo (title, description, category_id)`;

  if (title && description && categoryId) {
      query += ` VALUES ('${title}', '${description}', ${categoryId})`;
      console.log(query);
      connection.query(query, (error, result) => {
      if (error) {
        response.status(404).send();
        console.log(error);
      } else {
        response.send(result);
      }
    });
  } else {
        response.statusCode = 400;
        response.send("BAD REQUEST");
      }
});


app.listen(port, () => {
  console.log("Servidor rodando!");
});