import { useEffect, useState } from 'react';
import type { Task } from '../types/task';
import { fetchTasks, createTask, updateTask, deleteTask, toggleTask } from '../services/taskService';
import Header from '../../../components/Header';
import { useNavigate } from 'react-router-dom';
import './TasksPage.css';
import Toast from '../../../components/Toast';
import type { TaskFormValues } from '../components/TaskModal';
import TaskModal from '../components/TaskModal';
import TaskCard from '../components/TaskCard';
import type { TaskFilter } from '../components/TaskFilterPanel';
import TaskFilterPanel from '../components/TaskFilterPanel';

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

const emptyForm: TaskFormValues = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
  tags: '',
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [toast, setToast] = useState<{msg: string, type: 'error'|'success'|'info'}|null>(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [filter, setFilter] = useState<TaskFilter>({
    search: '',
    priority: '',
    completed: '',
    startDate: '',
    endDate: '',
    tag: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setToast({msg: 'Oturumunuzun süresi doldu, tekrar giriş yapın.', type: 'error'});
      setTimeout(() => navigate('/login'), 1200);
      return;
    }
    const payload = parseJwt(token);
    if (!payload || !payload.username) {
      setToast({msg: 'Oturumunuzun süresi doldu, tekrar giriş yapın.', type: 'error'});
      localStorage.removeItem('token');
      setTimeout(() => navigate('/login'), 1200);
      return;
    }
    setUsername(payload.username);
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err: any) {
      if (err.message === 'Görevler alınamadı') {
        setToast({msg: 'Oturumunuzun süresi doldu, tekrar giriş yapın.', type: 'error'});
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setToast({msg: 'Görevler yüklenemedi.', type: 'error'});
      }
      setTasks([]);
    }
  };

  const handleAddClick = () => {
    setEditTask(null);
    setModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditTask(null);
  };

  const handleModalSubmit = async (values: TaskFormValues) => {
    try {
      if (editTask) {
        await updateTask(editTask.id, values);
        setToast({msg: 'Görev güncellendi', type: 'success'});
      } else {
        await createTask(values);
        setToast({msg: 'Görev eklendi', type: 'success'});
      }
      setModalOpen(false);
      setEditTask(null);
      loadTasks();
    } catch (err: any) {
      setToast({msg: err.message || 'İşlem başarısız', type: 'error'});
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setToast({msg: 'Görev silindi', type: 'success'});
    loadTasks();
  };

  const handleToggle = async (id: number) => {
    await toggleTask(id);
    loadTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Tüm görevlerden mevcut etiketleri çıkar
  const allTags = Array.from(new Set(tasks.flatMap(t => t.tags || [])));

  // Filtrelenmiş görevler
  const filteredTasks = tasks.filter(task => {
    if (filter.priority && task.priority !== filter.priority) return false;
    if (filter.completed && String(task.completed) !== filter.completed) return false;
    if (filter.startDate && (!task.dueDate || task.dueDate < filter.startDate)) return false;
    if (filter.endDate && (!task.dueDate || task.dueDate > filter.endDate)) return false;
    if (filter.tag && !(task.tags || []).includes(filter.tag)) return false;
    if (filter.search) {
      const q = filter.search.toLowerCase();
      if (!task.title.toLowerCase().includes(q) && !(task.description || '').toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="tasks-page">
      <Header username={username} onLogout={handleLogout} />
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="tasks-content">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.2rem'}}>
          <h2>Görevlerim</h2>
          <button className="task-add-btn" onClick={handleAddClick}>+ Yeni Görev</button>
        </div>
        <TaskModal
          open={modalOpen}
          initialValues={editTask ? {
            title: editTask.title,
            description: editTask.description || '',
            priority: editTask.priority,
            dueDate: editTask.dueDate || '',
            tags: editTask.tags ? editTask.tags.join(',') : '',
          } : emptyForm}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
        <TaskFilterPanel filter={filter} onChange={setFilter} tags={allTags} />
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty-message">Kriterlere uygun görev bulunamadı.</div>
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                dueDate={task.dueDate}
                tags={task.tags}
                completed={task.completed}
                onToggle={() => handleToggle(task.id)}
                onEdit={() => handleEdit(task)}
                onDelete={() => handleDelete(task.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
