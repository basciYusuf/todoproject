import React from 'react';
import styles from './TaskFilterPanel.module.css';

export interface TaskFilter {
  search: string;
  priority: '' | 'low' | 'medium' | 'high';
  completed: '' | 'true' | 'false';
  startDate: string;
  endDate: string;
  tag: string;
}

interface Props {
  filter: TaskFilter;
  onChange: (filter: TaskFilter) => void;
  tags: string[];
}

const TaskFilterPanel: React.FC<Props> = ({ filter, onChange, tags }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.title}>Filtreleme ile Görev Ara</div>
      <input
        name="search"
        value={filter.search}
        onChange={handleChange}
        placeholder="Görev veya açıklama ara..."
        className={styles.search}
      />
      <select name="priority" value={filter.priority} onChange={handleChange}>
        <option value="">Öncelik (tümü)</option>
        <option value="low">Düşük</option>
        <option value="medium">Orta</option>
        <option value="high">Yüksek</option>
      </select>
      <select name="completed" value={filter.completed} onChange={handleChange}>
        <option value="">Durum (tümü)</option>
        <option value="false">Aktif</option>
        <option value="true">Tamamlandı</option>
      </select>
      <input
        name="startDate"
        type="date"
        value={filter.startDate}
        onChange={handleChange}
        className={styles.date}
      />
      <input
        name="endDate"
        type="date"
        value={filter.endDate}
        onChange={handleChange}
        className={styles.date}
      />
      <select name="tag" value={filter.tag} onChange={handleChange}>
        <option value="">Etiket (tümü)</option>
        {tags.map(tag => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>
    </div>
  );
};

export default TaskFilterPanel; 