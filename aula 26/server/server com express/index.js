const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());
const port = 3000;

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
    if(url.query.id){
        connection.query(`UPDATE todo SET deleted_at='${deletedAt}' WHERE id=${url.query.id}`
        , (error, result) => {
          if (error) {
            console.log(error);
            response.status(500).send("SERVER ERROR");
          } else {
            response.send(result);
          }
        });
      } else {
        response.status(400).send("BAD REQUEST");
      }
});

app.put('/todo/:id', (request, response) => {
    if(url.query.id){
        let data = "";
        request.on('data', (chunk) => {
            data += chunk;
        });
        request.on("end", () => {
            let task = JSON.parse(data);
            if (task.title && task.description && task.categoryId) {
              connection.query(`UPDATE todo SET title='${task.title}', description='${task.description}', category_id=${task.categoryId}, updated_at='${task.updatedAt}' WHERE id=${url.query.id}`
              , (error, result) => {
                if (error) {
                  console.log(error);
                  response.status(500).send("SERVER ERROR");
                } else {
                  response.send(result);
                }
              });
            } else {
              response.status(400).send("BAD REQUEST");
            }
        });
      } else {
        response.status(400).end("BAD REQUEST");
      }
});

app.post('/todo', (request, response) => {
    let data = "";
    request.on('data', (chunk) => {
        data += chunk;
    });
    request.on("end", () => {
      let task = JSON.parse(data);
      if (task.categoryId && task.title && task.description) {
        connection.query(`INSERT INTO todo (title, description, category_id) VALUES ('${task.title}', '${task.description}', '${task.categoryId}')`, (error, result) => {
          if (error) {
            response.status(500).send("SERVER ERROR");
          } else {
            response.send("CREATED");
          }
        });
      } else {
        response.status(400).send("BAD REQUEST");
      }
    }); 
});


app.listen(port, () => {
  console.log("Servidor rodando!");
});