import { useRouter } from 'next/router';
import NoteForm from '../../components/NoteForm';
import dbConnect from '../../lib/dbConnect';
import Note from '../../models/Note';
import styles from '../../styles/Home.module.css';

export default function EditNote({ note }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  const noteForm = {
    title: note.title,
    description: note.description,
  };

  return (
    <div>
      <h1 className={styles.title}>Editar Nota</h1>
      <NoteForm formId="edit-note-form" noteForm={noteForm} forNewNote={false} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();

  const note = await Note.findById(params.id).lean();
  
  if (!note) {
    return {
      notFound: true,
    };
  }

  note._id = note._id.toString();
  note.createdAt = note.createdAt.toString();
  note.updatedAt = note.updatedAt.toString();

  return {
    props: { note },
  };
}
