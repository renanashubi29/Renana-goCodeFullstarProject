import fs from "fs";

////////////////////////////
const printAllToDos=()=>{
const todosRaw = fs.readFileSync("./todos.json", "utf-8");
const todos = JSON.parse(todosRaw);
console.log(todos);
}
///////////////////////////
const printItemById=(idToFind)=>{
const todosRaw = fs.readFileSync("./todos.json", "utf-8");
const itemToFind =((JSON.parse(todosRaw)).find(item=>item.id===idToFind));
if (!itemToFind) {
console.log("The specified todo was not found.");
  return;
}
console.log(itemToFind);
}

/////////////////////////
const addNewToDo=( taskName,priority)=>{
const todosRaw = fs.readFileSync("./todos.json", "utf-8");

const todos = JSON.parse(todosRaw);
const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;
todos.push({ id:newId,
    task: taskName,
    completed: false,
    priority: priority})
    const todosString = JSON.stringify(todos, null, 2);

fs.writeFileSync("./todos.json", todosString, "utf-8");
}

////////////////////////
const DeleteItemFromToDos=(inputId)=>{
const todosRaw = fs.readFileSync("./todos.json", "utf-8");

const todos = JSON.parse(todosRaw);
const filteredTodos=todos.filter(item=>item.id!=+inputId);
 if (filteredTodos.length === todos.length) {
    console.log("The item does not exist in todos");
    return;
  }
  const todosString = JSON.stringify(filteredTodos, null, 2);
  fs.writeFileSync("./todos.json", todosString, "utf-8");
}
/////////////////////////

const UpdateItem=(idToUp,args)=>{
const todosRaw = fs.readFileSync("./todos.json", "utf-8");

const todos = JSON.parse(todosRaw);

const p=todos.find(item=>item.id===idToUp)
if (!p) {
  console.log("The specified todo was not found.");
  return;
}
const allowedFields = ["task", "priority", "completed"];

let invalidField = null;
for (let i = 0; i < args.length; i += 2) {
  const field = args[i];
  if (!allowedFields.includes(field)) {
    invalidField = field;
    break;
  }
}
if (invalidField) {
  console.log(`Incorrect field: "${invalidField}". Allowed fields: task, priority, completed.`);
  return; 
}

for(let i=0;i<args.length;i+=2){
    if(args[i]==="task")
        p.task=args[i+1];
    else if(args[i]==="priority")
        p.priority=args[i+1];
    else
         p.completed=args[i+1]==="true";
     
}
 const todosString = JSON.stringify(todos, null, 2);
 fs.writeFileSync("./todos.json", todosString, "utf-8");
}
///////////////////////////////////////
const UpdateStatusItem=(idToUp)=>{
const todosRaw = fs.readFileSync("./todos.json", "utf-8");

const todos = JSON.parse(todosRaw);
const p=todos.find(item=>item.id===+idToUp)
if (!p) {
  console.log("The specified todo was not found.");
  return;
}
if(!p.completed)
  p.completed=!p.completed;

console.log(todos);

 const todosString = JSON.stringify(todos, null, 2);
 fs.writeFileSync("./todos.json", todosString, "utf-8");
}
//UpdateStatusItem(process.argv[2]);

/* ---------- Main ---------- */
const action = process.argv[2]?.toUpperCase();
const args = process.argv.slice(3);
switch (action) {
  case "LIST":
    printAllToDos();
    break;

     case "GET":
      if (!args[0]) {
   console.log("Missing argument.\nTo print a specific todo, enter:\nFirst argument: todo id");
    break;
  }
  printItemById(Number(args[0]));
    break;

     case "ADD":
        if (!args[0] || !args[1]) {
    console.log('Missing arguments-To add a new todo, enter:\nFirst argument: task name\nSecond argument: priority');
    break;
  }
  addNewToDo(args[0], args[1]);
    break;

     case "DELETE":
      if (!args[0]) {
   console.log("Missing argument.\nTo delete a specific todo, enter:\nFirst argument: todo id");
    break;
  }
    DeleteItemFromToDos(Number(args[0]));
    break;

    case "UPDATE":
 const updateArgs = args.slice(1);
if (!args[0]) {
  console.log("Missing todo ID. Usage: UPDATE <id> <field> <new value> [additional field/value pairs]");
  break;
}

if (updateArgs.length === 0) {
  console.log("No fields provided to update. You must provide at least one field and its new value.");
  break;
}

if (updateArgs.length > 6) {
  console.log("Too many fields. You can update up to 3 fields at a time.");
  break;
}

if (updateArgs.length % 2 !== 0) {
  console.log("Incorrect number of arguments. Each field must have a corresponding value.");
  break;
}

 UpdateItem(Number(args[0]), updateArgs);
    break;

  case "CHANGE-STATUS":
        if (!args[0]) {
   console.log("Missing argument.\nTo print a specific todo, enter:\nFirst argument: todo id");
    break;
  }
  UpdateStatusItem(args[0]);
  break;
default:
    console.log("Unknown command");
}
