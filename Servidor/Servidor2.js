const http = require("http");
const url = require("url");

const { listTodos, addTodo, updateTodo, deleteTodo } = require("./todos-route");


function processRequest(request, response){

    const reqUrl = url.parse(request.url, true);
    if (reqUrl.pathname == "/todo"){
         switch(request.method){
             case "GET":
              listTodos(request, response);
                break;
             case "POST":
              addTodo(request, response);
                break;
             case "PUT":
              updateTodo(request, response);
                break;
             case "DELETE":
              deleteTodo(request, response);
                break;
}
}
}
const server = http.createServer(processRequest);
server.listen(3000);