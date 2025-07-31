// src/hooks/useNotes.ts
import { useState, useEffect, useCallback } from 'react';
import type { Note, NoteInput } from '../types/Note';
import { 
  saveNotesToStorage, 
  loadNotesFromStorage, 
  generateId 
} from '../utils/localStorage';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Load notes from localStorage on mount
  useEffect(() => {
    const loadedNotes = loadNotesFromStorage();
    setNotes(loadedNotes);
    setLoading(false);
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (!loading) {
      saveNotesToStorage(notes);
    }
  }, [notes, loading]);

  const addNote = useCallback((noteInput: NoteInput) => {
    const newNote: Note = {
      id: generateId(),
      title: noteInput.title,
      content: noteInput.content,
      color: noteInput.color || '#ffffff',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setNotes(prev => [newNote, ...prev]);
    return newNote;
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<NoteInput>) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ));
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  }, []);

  const searchNotes = useCallback((query: string): Note[] => {
    if (!query.trim()) return notes;
    
    const lowercaseQuery = query.toLowerCase();
    return notes.filter(note => 
      note.title.toLowerCase().includes(lowercaseQuery) ||
      note.content.toLowerCase().includes(lowercaseQuery)
    );
  }, [notes]);

  return {
    notes,
    loading,
    addNote,
    updateNote,
    deleteNote,
    searchNotes
  };
};