const http = require("http");
const url = require("url");

const fs = require("fs");
const path = require("path");

const options = {
  encoding: "utf-8"
};

let todos = [];
let categories = [];
let users = [];

fs.readFile(path.join("db", "category.json"), options, (error, data) => {
  if (!error){
    categories = JSON.parse(data);
  } else {
    console.error(error);
  }
})

fs.readFile(path.join("db", "todo.json"), options, (error, data) => {
  if (!error){
    todos = JSON.parse(data);
  } else {
    console.error(error);
  }
})

fs.readFile(path.join("db", "user.json"), options, (error, data) => {
    if (!error){
      users = JSON.parse(data);
    } else {
      console.error(error);
    }
  })

const writeTODOtoFile = () => {
  fs.writeFile(path.join("db", "todo.json"), JSON.stringify(todos), (err) => {
    if(err){
      console.error(err);
    }
  });
}

const writeCATEGORYtoFile = () => {
  fs.writeFile(path.join("db", "category.json"), JSON.stringify(categories), (err) => {
    if(err){
      console.error(err);
    }
  });
}
const writeUSERtoFile = () => {
    fs.writeFile(path.join("db", "user.json"), JSON.stringify(users), (err) => {
      if(err){
        console.error(err);
      }
    });
  }
  

const { listTodos, addTodo, updateTodo, deleteTodo, setupCurrentIdTodos } = require("./todos-route");
const { listCategories, addCategory, updateCategory, deleteCategory, setupCurrentIdCategories } = require("./category-route");
const { listUser, addUser, updateUser, deleteUser, setupCurrentIdUser } = require("./user-route");

setupCurrentIdTodos(todos);
setupCurrentIdCategories(categories);
setupCurrentIdUser(users);

function processRequest(request, response){

    const reqUrl = url.parse(request.url, true);
    if (reqUrl.pathname == "/todo"){
        switch(request.method) {
            case "GET":
              listTodos(request, response, reqUrl, todos, categories, users, writeTODOtoFile);
              break;
            case "POST":
              addTodo(request, response, reqUrl, todos, categories, users, writeTODOtoFile);
              break;
            case "PUT":
              updateTodo(request, response, reqUrl, todos, categories, users, writeTODOtoFile);
              break;
            case "DELETE":
              deleteTodo(request, response, reqUrl, todos, categories, users, writeTODOtoFile);
              break;
        }
    } else if (reqUrl.pathname == "/category"){
        switch(request.method) {
            case "GET":
              listCategories(request, response, reqUrl, todos, categories, users, writeCATEGORYtoFile);
              break;
            case "POST":
              addCategory(request, response, reqUrl, todos, categories, users, writeCATEGORYtoFile);
              break;
            case "PUT":
              updateCategory(request, response, reqUrl, todos, categories, users, writeCATEGORYtoFile);
              break;
            case "DELETE":
              deleteCategory(request, response, reqUrl, todos, categories, users, writeCATEGORYtoFile);
              break;
        }
    } else if (reqUrl.pathname == "/user"){
        switch(request.method) {
            case "GET":
              listUser(request, response, reqUrl, todos, categories, users, writeUSERtoFile);
              break;
            case "POST":
              addUser(request, response, reqUrl, todos, categories, users, writeUSERtoFile);
              break;
            case "PUT":
              updateUser(request, response, reqUrl, todos, categories, users, writeUSERtoFile);
              break;
            case "DELETE":
              deleteUser(request, response, reqUrl, todos, categories, users, writeUSERtoFile);
              break;
        }
    }
}
const server = http.createServer(processRequest);
server.listen(3000);