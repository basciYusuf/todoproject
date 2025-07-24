import type { Task } from '../types/task';
import type { TaskFormValues } from '../components/TaskModal';

const API = 'http://localhost:3000/api/tasks';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(API, { headers: getHeaders() });
  if (!res.ok) throw new Error('Görevler alınamadı');
  return res.json();
};

export const createTask = async (input: TaskFormValues) => {
  // Etiketleri string olarak alıp diziye çeviriyoruz
  const tags = input.tags ? input.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  const res = await fetch(API, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ ...input, tags }),
  });
  if (!res.ok) throw new Error('Görev eklenemedi');
};

export const updateTask = async (id: number, input: TaskFormValues) => {
  const tags = input.tags ? input.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ ...input, tags }),
  });
  if (!res.ok) throw new Error('Görev güncellenemedi');
};

export const deleteTask = async (id: number) => {
  const res = await fetch(`${API}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Görev silinemedi');
};

export const toggleTask = async (id: number) => {
  const res = await fetch(`${API}/${id}/toggle`, {
    method: 'PATCH',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Görev güncellenemedi');
};
