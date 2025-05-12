import mongoose from 'mongoose';

const PasteSchema = new mongoose.Schema({
  paste_id: { type: String, unique: true },
  title: String,
  content: { type: String, required: true },
  language: { type: String, default: 'plaintext' },
  is_private: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  expires_at: { type: Date, default: null },
});

export default mongoose.models.Paste || mongoose.model('Paste', PasteSchema);
