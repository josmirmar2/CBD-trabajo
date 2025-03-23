import axios from 'axios';
import Link from 'next/link';
import NoteCard from '../components/NoteCard';
import dbConnect from '../lib/dbConnect';
import Note from '../models/Note';
import styles from '../styles/Home.module.css';

export default function Home({ notes }) {
  return (
    <div>
      <h1 className={styles.title}>Mis Notas</h1>
      
      {notes.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>Aún no tienes notas</p>
          <Link href="/new">
            <a className="btn btn-primary">
              Crear tu primera nota
            </a>
          </Link>
        </div>
      ) : (
        <div className={styles.gridContainer}>
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  
  /* Obtener notas */
  const result = await Note.find({}).lean();
  const notes = result.map((doc) => {
    const note = doc;
    note._id = note._id.toString();
    note.createdAt = note.createdAt.toString();
    note.updatedAt = note.updatedAt.toString();
    return note;
  });

  return { props: { notes: notes } };
}
