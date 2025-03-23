import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/NoteForm.module.css';

export default function NoteForm({ formId, noteForm, forNewNote = true }) {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: noteForm.title || '',
    description: noteForm.description || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación
    const errs = formValidate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    
    if (forNewNote) {
      // Crear nueva nota
      try {
        await axios.post('/api/notes', form);
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    } else {
      // Actualizar nota existente
      try {
        await axios.put(`/api/notes/${router.query.id}`, form);
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formValidate = () => {
    let err = {};
    if (!form.title) err.title = 'El título es requerido';
    if (!form.description) err.description = 'La descripción es requerida';
    return err;
  };

  return (
    <form id={formId} onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>Título</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.title && (
          <p className={styles.errorText}>{errors.title}</p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          className={styles.textarea}
        ></textarea>
        {errors.description && (
          <p className={styles.errorText}>{errors.description}</p>
        )}
      </div>
      <button
        type="submit"
        className={`btn btn-primary ${styles.submitButton}`}
      >
        {forNewNote ? 'Crear Nota' : 'Actualizar Nota'}
      </button>
    </form>
  );
}
