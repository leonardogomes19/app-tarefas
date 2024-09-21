'use client';

import { useState } from 'react';
import Header from "../../components/Header";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const Tarefas = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState(''); // Mantém o estado da nova tarefa
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  // Função para adicionar nova tarefa
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, title: newTask, completed: false }]);
      setNewTask(''); // Limpa o campo de input
      setShowModal(false); // Fecha o modal após adicionar a tarefa
    }
  };

  // Função para alternar a conclusão da tarefa
  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  // Função para deletar a tarefa
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  // Filtra as tarefas concluídas e não concluídas
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <>
      <Header />
      <div className="task-page"> {/* Use class from SCSS */}

        {/* Container para as tarefas ativas */}
        <div className="tasks-container">
          <h2 className="task-title">Suas tarefas de hoje</h2>
          <ul>
            {activeTasks.map((task) => (
              <li key={task.id} className="task-item">
                <div className="task-content">
                  <input
                    type="checkbox"
                    id={`task-${task.id}`}
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                  />
                  <label htmlFor={`task-${task.id}`} className="custom-checkbox">
                    <i className="fas fa-check"></i> {/* Ícone de check */}
                  </label>
                  <span className="task-text">{task.title}</span>
                </div>
                <button className="task-delete" onClick={() => setTaskToDelete(task.id)}>
                <img className="task-icon" src="/images/trash.png" alt={('trash')}></img>
                  {/* <i className="fas fa-trash"></i> */}
                </button>
              </li>
            ))}
          </ul>

          {/* Lista de tarefas finalizadas */}
          <h2 className="task-title">Tarefas finalizadas</h2>
          <ul>
            {completedTasks.map((task) => (
              <li key={task.id} className="task-item completed">
                <div className="task-content">
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                  />
                  <label htmlFor={`task-${task.id}`} className="custom-checkbox">
                    <i className="fas fa-check"></i>
                  </label>
                  <span className="task-text" style={{ textDecoration: 'line-through' }}>{task.title}</span> {/* Grifa o texto da tarefa */}
                </div>
                <button className="task-delete" onClick={() => setTaskToDelete(task.id)}>
                <img className="task-icon" src="/images/trash.png" alt={('trash')}></img>
                  {/* <i className="fas fa-trash"></i> */}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Botão para adicionar tarefa */}
        <button className="add-task-btn" onClick={() => setShowModal(true)}>Adicionar nova tarefa</button>

        {/* Modal para adicionar tarefa */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Nova tarefa</h2>
              <label htmlFor="task-title">Título</label>
              <input
                type="text"
                id="task-title"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Digite"
              />
              <div className="button-container">
                <button className="button-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="button-save" onClick={handleAddTask}>Adicionar</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmação de exclusão */}
        {taskToDelete !== null && (
          <div className="modal">
            <div className="modal-content">
              <h2>Deletar tarefa</h2>
              <p>Tem certeza que você deseja deletar essa tarefa?</p>
              <div className="button-container">
                <button className="button-cancel" onClick={cancelDelete}>Cancelar</button>
                <button className="button-delete" onClick={() => handleDeleteTask(taskToDelete)}>Deletar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tarefas;