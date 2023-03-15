
let currentId = 0;

function setupCurrentIdUser(users) {
  for (let i=0; i<users.length; i++){
      if (users[i].id > currentId)
        currentId = users[i].id;
  }
}

function addID(user) {
  currentId = currentId + 1;
  user.id = currentId;
}

function addTimestemp(user) {
  user.createdAt = +new Date();
  user.updatedAt = +new Date();
}

function addUser(request, response, url, todos, categories, users, writeUSERtoFile) {
    response.statusCode = 201;
    let data = "";
    request.on('data', (chunk) => {
        data += chunk;
    });
    request.on("end", () => {
      let task = JSON.parse(data);
      if (task.name && task.isActive && task.username && task.password)  {
        for(let i = 0; i<users.length; i++ ){
          if(task.username != users[i].username){
            addID(task);
            addTimestemp(task);
            users.push(task);
            writeUSERtoFile();
            response.end();
           } else {
        response.statusCode = 400;
        response.end("BAD REQUEST");
      }}} else {
        response.statusCode = 400;
        response.end("BAD REQUEST");
      } 
    }); 
}

function listUser(request, response, url, todos, categories, users) {
    response.setHeader ('Content-type', 'application/json')
    if (url.query.id) {
        let task = findById(url.query.id);
        if (task && (!task.deletedAt || url.query.showDeleted == "true")){
            response.end(JSON.stringify(task));
        }else {
            response.statusCode = 404;
            response.end("NOT FOUND");
        }
    } else {
        let newUser = [];
        for (let i = 0; i <users.length; i++){
            if(!users[i].deletedAt || url.query.showDeleted == "true"){
                newUser.push(users[i]);
            }
        }
        response.end(JSON.stringify(newUser));
    }
}

function deleteUser(request, response, url, todos, categories, users, writeUSERtoFile) {
  if(url.query.id){
      for(let i=0; i<users.length; i++){
          if(users[i].id == url.query.id){
            users[i].deletedAt = +new Date();
            writeUSERtoFile();
          }
      } 
      response.end();
  } else {
    response.statusCode = 400;
    response.end("BAD REQUEST");
  }
}

function updateUser(request, response, url, todos, categories, users, writeUSERtoFile) {
  if(url.query.id){
    for(let i=0; i<users.length; i++) {
      if(users[i].id == url.query.id && !users[i].deletedAt) {
        let data = "";
        request.on('data', (chunk) => {
            data += chunk;
        });
        request.on("end", () => {
            let task = JSON.parse(data);
            if (task.name && task.isActive && task.username && task.password){
              task.id = users[i].id;
              task.createdAt = users[i].createdAt;
              task.updatedAt = +new Date();
              users[i] = task;
              writeUSERtoFile();
              response.end();
            } else {
              response.statusCode = 400;
              response.end("BAD REQUEST");
            }
        });
        return;
      }
    }
    response.statusCode = 404;
    response.end("NOT FOUND");
  } else {
    response.statusCode = 400;
    response.end("BAD REQUEST");
  }
}

module.exports = {
  listUser, addUser, updateUser, deleteUser,setupCurrentIdUser
}