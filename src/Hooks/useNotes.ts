import { useState, useEffect } from 'react';
import type { Note, NoteFormData } from '../types';
import { saveNotesToStorage, loadNotesFromStorage } from '../utils/localStorage';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const savedNotes = loadNotesFromStorage();
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    saveNotesToStorage(notes);
  }, [notes]);

  const addNote = (formData: NoteFormData) => {
    const newNote: Note = {
      id: Date.now(),
      title: formData.title.trim() || 'Untitled',
      content: formData.content.trim(),
      createdAt: new Date().toLocaleDateString()
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
  };

  const deleteNote = (id: number) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  return {
    notes,
    addNote,
    deleteNote,
  };
};