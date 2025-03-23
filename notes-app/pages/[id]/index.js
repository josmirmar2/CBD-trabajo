import { useRouter } from 'next/router';
import Link from 'next/link';
import dbConnect from '../../lib/dbConnect';
import Note from '../../models/Note';
import styles from '../../styles/Home.module.css';

export default function NotePage({ note }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1 className={styles.title}>{note.title}</h1>
      <div style={{ 
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '1.5rem'
      }}>
        <p style={{ whiteSpace: 'pre-line' }}>{note.description}</p>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/">
          <a className="btn btn-secondary">
            Volver
          </a>
        </Link>
        <Link href={`/${note._id}/edit`}>
          <a className="btn btn-warning">
            Editar
          </a>
        </Link>
      </div>
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
