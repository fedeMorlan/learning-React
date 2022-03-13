import React from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

/* Nota: definimos objetos constantes fuera de la función App
porque sino serían recalculados cada vez que se re-renderice el componente */

// objeto que usaremos para aplicar comportamientos a los filtros
const FILTER_MAP = {
  // para el filtro de "todos", nos devuelve todos
  All: () => true, 
  // para el filtro de "activos", nos devuelve los que no estén completados
  Active: task => !task.completed,
  // para el filtro de "completados", nos devuelve los que están completados
  Completed: task => task.completed
}

// el método .keys recolecta un arreglo de FILTER_NAMES del objeto FILTER_MAP
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  
  function editTask(id, newName){
    const editedTaskList = tasks.map(task => {
      if (id === task.id){
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // elimina una tarea según su id
  function deleteTask(id) {
    // aplica un filtro en los objetos, eliminando la que coincida con el id deseado
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  /* recibe un nombre y crea una tarea con ese nombre */
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed:false };
    setTasks([...tasks, newTask]);
  }

  // definir estado para manipular las tareas de la app
  const [tasks, setTasks] = useState(props.tasks);

  // definir filtros para manipular los filtros de tareas (todos, completado, incompleto)
  const [filter, setFilter] = useState('All');

  function toggleTaskCompleted(id) {
    // mapea todo el arreglo de tareas, modificando (copia y reasignacion) sólo 1 de ellas
    const updatedTasks = tasks.map(task =>{
      //si esta task tiene el mismo ID que la editada
      if (id === task.id) {
        // usar object spread para hacer un nuevo objeto
        // cuyo prop 'completed' se haya invertido
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // ya nos guardamos props.tasks en la variable "tasks"
  const taskList = tasks
    // se accede al valor en FILTER_MAP que corresponde a la clave del estado de filter
    // cuando el filtro es "All", .filter(FILTER_MAP[filter]) evalúa a () => true
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo 
        id={task.id} 
        name={task.name} 
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask} 
        editTask={editTask}
      />
    )
  );

  // constante para mapear sobre el arreglo de nombres y retornar un componente FilterButton
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  
    // conteo de cantidad de tareas (1 "tarea" o "tareas")
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      {/* addTask es una funcion que se manda como prop: callback prop */}
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      {/* https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html */}
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}


export default App;
