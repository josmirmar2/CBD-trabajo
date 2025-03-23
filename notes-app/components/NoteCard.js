import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/NoteCard.module.css';

export default function NoteCard({ note }) {
  const router = useRouter();
  
  const deleteNote = async () => {
    const noteId = note._id;
    
    try {
      await axios.delete(`/api/notes/${noteId}`);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{note.title}</h3>
      <p className={styles.cardDescription}>
        {note.description.substring(0, 100)}
        {note.description.length > 100 ? '...' : ''}
      </p>
      <div className={styles.cardActions}>
        <Link href={`/${note._id}`}>
          <a className={`btn btn-primary ${styles.cardButton}`}>
            Ver
          </a>
        </Link>
        <Link href={`/${note._id}/edit`}>
          <a className={`btn btn-warning ${styles.cardButton}`}>
            Editar
          </a>
        </Link>
        <button
          className={`btn btn-danger ${styles.cardButton}`}
          onClick={deleteNote}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
