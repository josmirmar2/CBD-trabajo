import mongoose from 'mongoose';

/* El modelo Note solo se definirá una vez */
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Por favor agrega un título'],
    maxlength: [60, 'El título no puede tener más de 60 caracteres'],
  },
  description: {
    type: String,
    required: [true, 'Por favor agrega una descripción'],
    maxlength: [1000, 'La descripción no puede tener más de 1000 caracteres'],
  },
}, { 
  timestamps: true 
});

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
