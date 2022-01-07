import { useState, useRef, useEffect } from 'react';
import { useStorage } from './useStorage';
import './App.css';
import { UsePrevious, TodoForm, TodoItem, FilterButton } from './components';
import { nanoid } from 'nanoid';
import nightImg from './assets/night.jpg';
import dayImg from './assets/day.jpg';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

function App() {
  const [tasks, setTasks] = useStorage("tasks", []);
  const [filter, setFilter] = useState('All');
  const [nightMode, setNightMode] = useState(false);

  const listHeadingRef = useRef(null);

  const FILTER_MAP = {
    //Values to use for filter tasks
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  }
  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
      <TodoItem
        id={task.id}
        name={task.name}
        text = {task.text}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
  ));


  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if(id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }


  // CRUD
  function editTask(id, newText) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, text: newText}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter( task => id !== task.id);
    setTasks(remainingTasks);
  }
  
  const addTask = (text) => {
    const newTask = {id: nanoid(), text: text, completed: false};
    setTasks([...tasks, newTask]);
  }


  const taskNoun = tasks.length === 1 ? 'task' : 'tasks';
  const headingText = `${tasks.length} ${taskNoun} remaining`;

  const prevTaskLength = UsePrevious(tasks.length);

  useEffect(() => {
      if (tasks.length - prevTaskLength === -1) {
        listHeadingRef.current.focus();
      }
  }, [tasks.length, prevTaskLength]);

  return (
    <div 
      className="App" 
      style={nightMode ? {backgroundImage: `url(${nightImg})`} : {backgroundImage: `url(${dayImg})`}}
    >
      <main>
        <h1>What needs to be done?</h1>
        <TodoForm addTask={addTask}/>
        <ul className="todoList">
          <h2 tabIndex="-1" ref={listHeadingRef}>{headingText}</h2>
          {taskList}
          <div className="filter-group">{filterList}</div>
        </ul>
      </main>
      
      <button className="theme-btn" onClick={() => setNightMode(!nightMode)}>
            {nightMode ? <Brightness2Icon /> : <WbSunnyIcon />}
      </button>
    </div>
  );
}

export default App;
