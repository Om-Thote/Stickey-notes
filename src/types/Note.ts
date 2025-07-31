// src/types/Note.ts
export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    color?: string;
  }
  
  export interface NoteInput {
    title: string;
    content: string;
    color?: string;
  }
  
  export interface AppState {
    isTransparent: boolean;
    isDarkMode: boolean;
  }
  
  export type NoteAction = 
    | { type: 'ADD_NOTE'; payload: NoteInput }
    | { type: 'UPDATE_NOTE'; payload: { id: string; updates: Partial<NoteInput> } }
    | { type: 'DELETE_NOTE'; payload: string }
    | { type: 'LOAD_NOTES'; payload: Note[] };
  
  export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
  }
  
  export interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }