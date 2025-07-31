// src/utils/localStorage.ts
import type { Note, AppState } from '../types/Note';

const NOTES_KEY = 'animated-notes-app-notes';
const APP_STATE_KEY = 'animated-notes-app-state';

export const saveNotesToStorage = (notes: Note[]): void => {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Failed to save notes to localStorage:', error);
  }
};

export const loadNotesFromStorage = (): Note[] => {
  try {
    const stored = localStorage.getItem(NOTES_KEY);
    if (!stored) return [];
    
    const notes = JSON.parse(stored);
    // Convert date strings back to Date objects
    return notes.map((note: any) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt)
    }));
  } catch (error) {
    console.error('Failed to load notes from localStorage:', error);
    return [];
  }
};

export const saveAppStateToStorage = (state: AppState): void => {
  try {
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save app state to localStorage:', error);
  }
};

export const loadAppStateFromStorage = (): AppState => {
  try {
    const stored = localStorage.getItem(APP_STATE_KEY);
    if (!stored) return { isTransparent: false, isDarkMode: false };
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load app state from localStorage:', error);
    return { isTransparent: false, isDarkMode: false };
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};