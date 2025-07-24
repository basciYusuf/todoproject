import React, { useState } from 'react';
import styles from './TaskCard.module.css';

export interface TaskCardProps {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags?: string[];
  completed: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const priorityLabels = {
  low: 'Düşük',
  medium: 'Orta',
  high: 'Yüksek',
};

const MAX_DESC_PREVIEW = 120;

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  priority,
  dueDate,
  tags,
  completed,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false);
  const isLong = (description || '').length > MAX_DESC_PREVIEW;
  const preview = isLong ? (description || '').slice(0, MAX_DESC_PREVIEW) + '...' : description;

  // Kartın tamamına tıklayınca modal açılır, ama butonlara tıklanınca açılmaz
  const handleCardClick = (e: React.MouseEvent) => {
    // Eğer tıklanan element bir buton ise modal açma
    if ((e.target as HTMLElement).tagName.toLowerCase() === 'button') return;
    setShowModal(true);
  };

  return (
    <div className={styles.card + (completed ? ' ' + styles.completed : '')} onClick={handleCardClick} style={{cursor:'pointer'}}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.priority + ' ' + styles[priority]}>{priorityLabels[priority]}</span>
      </div>
      {description && (
        <div className={styles.desc}>
          {preview}
          {isLong && (
            <button className={styles.more} onClick={e => {e.stopPropagation(); setShowModal(true);}}>Tümünü Gör</button>
          )}
        </div>
      )}
      <div className={styles.meta}>
        {dueDate && <span className={styles.due}>Bitiş: {dueDate}</span>}
        {tags && tags.length > 0 && (
          <span className={styles.tags}>{tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}</span>
        )}
      </div>
      <div className={styles.actions}>
        <button className={styles.toggle} onClick={e => {e.stopPropagation(); onToggle();}}>{completed ? 'Geri Al' : 'Tamamla'}</button>
        <button className={styles.edit} onClick={e => {e.stopPropagation(); onEdit();}}>Düzenle</button>
        <button className={styles.delete} onClick={e => {e.stopPropagation(); onDelete();}}>Sil</button>
      </div>
      {showModal && (
        <div className={styles.overlay} onClick={() => setShowModal(false)}>
          <div className={styles.detailModal} onClick={e => e.stopPropagation()}>
            <h3>{title}</h3>
            <div className={styles.fullDesc}>{description}</div>
            <button className={styles.closeDetail} onClick={() => setShowModal(false)}>Kapat</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard; 