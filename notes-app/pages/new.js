import NoteForm from '../components/NoteForm';
import styles from '../styles/Home.module.css';

export default function NewNote() {
  const noteForm = {
    title: '',
    description: '',
  };

  return (
    <div>
      <h1 className={styles.title}>Crear Nueva Nota</h1>
      <NoteForm formId="new-note-form" noteForm={noteForm} />
    </div>
  );
}
