import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Note } from '../types';
import DeleteButton from './DeleteButton';

interface CardProps {
  note: Note;
  onDelete: (id: number) => void;
  initialPosition?: { x: number; y: number };
}

const Card: React.FC<CardProps> = ({ note, onDelete, initialPosition = { x: 0, y: 0 } }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      dragConstraints={{
        left: 0,
        right: window.innerWidth - 300,
        top: 0,
        bottom: window.innerHeight - 200,
      }}
      initial={initialPosition}
      whileDrag={{ scale: 1.05, zIndex: 1000 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className={`
        absolute bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-400 h-fit w-72
        transition-shadow cursor-move select-none
        ${isDragging ? 'shadow-2xl' : 'hover:shadow-lg'}
      `}
      style={{ zIndex: isDragging ? 1000 : 1 }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800 text-lg pr-2 break-words">
          {note.title}
        </h3>
        <DeleteButton
          onClick={() => onDelete(note.id)}
          className="flex-shrink-0 cursor-pointer z-10"
        />
      </div>
      <p className="text-gray-600 text-sm mb-3 whitespace-pre-wrap break-words">
        {note.content}
      </p>
      <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
        Created: {note.createdAt}
      </div>
    </motion.div>
  );
};

export default Card;