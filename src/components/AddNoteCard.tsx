import React, { useState } from 'react';
import { Save } from 'lucide-react';
import type { NoteFormData } from '../types';
import Button from './Button';

interface AddNoteCardProps {
    onSave: (formData: NoteFormData) => void;
    onCancel: () => void;
}

const AddNoteCard: React.FC<AddNoteCardProps> = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState<NoteFormData>({ title: '', content: '' });
    const maxContentLength = 500;

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= maxContentLength) {
            setFormData({ ...formData, content: value });
        }
    };

    const handleSave = () => {
        if (formData.title.trim() || formData.content.trim()) {
            onSave(formData);
            setFormData({ title: '', content: '' });
        }
    };

    const handleCancel = () => {
        setFormData({ title: '', content: '' });
        onCancel();
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-blue-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Note</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Note title..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div>
                    <textarea
                        placeholder="Write your note here..."
                        value={formData.content}
                        onChange={handleContentChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">
                        {formData.content.length}/{maxContentLength} characters
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={handleSave}
                        variant="success"
                        className="flex items-center gap-2"
                    >
                        <Save size={16} />
                        Save Note
                    </Button>
                    <Button
                        onClick={handleCancel}
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddNoteCard;
