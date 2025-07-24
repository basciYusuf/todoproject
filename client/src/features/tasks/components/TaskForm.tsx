import { useState } from 'react';
import './TaskForm.css';

interface Props {
  onCreate: (title: string) => void;
}

const TaskForm = ({ onCreate }: Props) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Görev başlığı boş olamaz');
      return;
    }
    setError('');
    onCreate(title.trim());
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Yeni görev..."
        className="task-input"
      />
      <button type="submit" className="task-add">Ekle</button>
      {error && <div className="task-error">{error}</div>}
    </form>
  );
};

export default TaskForm;
