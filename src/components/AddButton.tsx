import React from 'react';
import { Plus } from 'lucide-react';
import Button from './Button';

interface AddButtonProps {
    onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
            variant="primary"
            className="flex items-center gap-2"
        >
            <Plus size={20} />
            Add Note
        </Button>
    );
};

export default AddButton;