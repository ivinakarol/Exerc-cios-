
let todos = [
    {id: 1, title: "Fazer feira", description: "Laranjas, Arroz, Carne"},
    //{id: 60,  },
   // {id: 30, }
];


let currentId = 1;
if (todos.length > 0){
    for (let i=0; i<todos.length; i++){
        if (todos[i].id > currentId)
        currentId = todos[i].id;
        }
    }


function addID(task){
    currentId = currentId + 1;
    task.id = currentId;
}

function addTimestemp(task){
    task.createdAt = +new Date ();
}

function addTodo(request, response) {
    
    for (let i=0; i<todos.length; i++){
       if (todos[i].title != ""  || todos[i].description != "") {
        response.statusCode = 201;
        let data = "";
        request.on('data', (chunk) => {
            data += chunk;
        });
         request.on("end", () => {
        let task = JSON.parse(data);
        addID(task);
        addTimestemp(task);
        todos.push(task);
        response.end();
    }); } 
     else {
        response.statusCode = 400;
        response.end("BAD REQUEST");
    }
}
} 
function listTodos(request, response) {
    response.setHeader('Content-type','application/json');
    response.end(JSON.stringify(todos));
}

function deleteTodo(request, response, url) {
    if(url.query.id){
        let newTodos = [];
        for(let i=0; i<todos.length; i++){
            if(todos[i].id != url.query.id){
                newTodos.push(todos[i]);
            }
    } 
    todos = newTodos;
    response.end();
 } else {
        response.statusCode = 400;
        response.end("BAD REQUEST");
    }
}

function updateTodo(request, response, url) {
    if(url.query.id){
        for(let i=0; i<todos.length; i++){
            if(todos[i].id == url.query.id){
                let data = "";
                request.on('data', (chunk) => {
                    data += chunk;
                });
                request.on("end", () => {
                    let task = JSON.parse(data);
                    task.id = todos[i].id;
                    todos[i] = task;
                    response.end();
                })
            }
        }
    response.end();
} else {
    response.statusCode = 400;
    response.end("BAD REQUEST");
}
}




module.exports = {
    addTodo, listTodos, deleteTodo, updateTodo
}