import type { Note } from '../types';

const STORAGE_KEY = 'notes';

export const saveNotesToStorage = (notes: Note[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes to localStorage:', error);
  }
};

export const loadNotesFromStorage = (): Note[] => {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    return savedNotes ? JSON.parse(savedNotes) : [];
  } catch (error) {
    console.error('Error loading notes from localStorage:', error);
    return [];
  }
};
