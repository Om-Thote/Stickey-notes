import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
    onClick: () => void;
    className?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors ${className}`}
            title="Delete note"
        >
            <Trash2 size={16} />
        </button>
    );
};

export default DeleteButton;