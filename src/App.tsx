import { PlusCircle } from 'phosphor-react'

import logo from './assets/Logo.svg'
import styles from './App.module.css'
import { EmptyMessage } from './components/EmptyMessage'
import { TaskTile } from './components/TaskTile'
import { ChangeEvent, FormEvent, useState } from 'react'

interface TaskProps {
  id: number,
  content: string,
  isMarked: boolean
}

export function App() {
  const [markedTasksCount, setMarkedTasksCount] = useState(0)
  const [tasks, setTasks] = useState<TaskProps[]>([])

  function handleMarkTask(id: Number) {
    const newTasksList = tasks.map(task => {
      if (task.id === id) {
        task.isMarked === false
          ? setMarkedTasksCount(markedTasksCount + 1)
          : setMarkedTasksCount(markedTasksCount - 1)

        return { ...task, isMarked: !task.isMarked }
      }
      return task
    })

    setTasks(newTasksList)
  }

  function handleDeleteTask(id: Number) {
    const newTaskList = tasks.filter(task => {
      if (task.id === id && task.isMarked) {
        setMarkedTasksCount(markedTasksCount - 1)
      }
      return task.id !== id
    })

    setTasks(newTaskList)
  }

  const [newTaskContent, setNewTaskContent] = useState('')
  const [idCount, setIdCount] = useState(0)

  function handleCreateTask(event: FormEvent) {
    event?.preventDefault()
    setTasks([...tasks, {
      id: idCount,
      content: newTaskContent,
      isMarked: false

    }])

    setIdCount(idCount + 1)
    setNewTaskContent('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskContent(event.target.value)
  }

  return (
    <div>
      <header className={styles.header}>
        <img src={logo} alt="Logo tipo do site contendo um foguete e a palavra To Do" />
      </header>

      <div className={styles.wrapper}>
        <form
          className={styles.input}
          onSubmit={handleCreateTask}
        >
          <input
            type="text"
            placeholder='Adicione uma nova tarefa'
            name="task"
            value={newTaskContent}
            onChange={handleNewTaskChange}
            required
          />
          <button>Criar <PlusCircle weight='bold' /></button>
        </form>

        <div className={styles.tasksInfo}>
          <div>
            <p>Tarefas criadas</p>
            <span>{tasks.length}</span>
          </div>

          <div className={styles.finishedTasks}>
            <p>Concluídas</p>
            {tasks.length > 0
              ? <span>{markedTasksCount} de {tasks.length}</span>
              : <span>0</span>}
          </div>
        </div>

        {
          tasks.map(task => (
            <TaskTile
              key={task.id}
              content={task.content}
              onClick={() => { handleMarkTask(task.id) }}
              onDeleteTask={() => { handleDeleteTask(task.id) }}
            />
          ))
        }

        {tasks.length === 0 && <EmptyMessage />}
      </div>
    </div>
  )
}
