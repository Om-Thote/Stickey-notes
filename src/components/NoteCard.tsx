// src/components/NoteCard.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Trash2, Save, X, Calendar } from 'lucide-react';
import type { Note } from '../types/Note';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { TextArea } from './ui/Input';

interface NoteCardProps {
    note: Note;
    onUpdate: (id: string, updates: { title: string; content: string; color?: string }) => void;
    onDelete: (id: string) => void;
    isTransparent: boolean;
    isDarkMode: boolean;
}

const colorOptions = [
    { name: 'Yellow', value: '#fef3c7', border: '#f59e0b' },
    { name: 'Pink', value: '#fce7f3', border: '#ec4899' },
    { name: 'Blue', value: '#dbeafe', border: '#3b82f6' },
    { name: 'Green', value: '#d1fae5', border: '#10b981' },
    { name: 'Purple', value: '#e9d5ff', border: '#8b5cf6' },
    { name: 'Orange', value: '#fed7aa', border: '#f97316' },
];

export const NoteCard: React.FC<NoteCardProps> = ({
    note,
    onUpdate,
    onDelete,
    isTransparent,
    isDarkMode
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content);
    const [selectedColor, setSelectedColor] = useState(note.color || '#fef3c7');
    const [showColorPicker, setShowColorPicker] = useState(false);

    const handleSave = () => {
        onUpdate(note.id, {
            title: editTitle.trim() || 'Untitled',
            content: editContent,
            color: selectedColor
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(note.title);
        setEditContent(note.content);
        setSelectedColor(note.color || '#fef3c7');
        setIsEditing(false);
        setShowColorPicker(false);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const borderColor = colorOptions.find(c => c.value === selectedColor)?.border || '#f59e0b';

    const cardBackground = isTransparent
        ? 'bg-white/10 backdrop-blur-md border-white/20'
        : isDarkMode
            ? 'bg-gray-800 border-gray-700'
            : `border-gray-200`;

    const textColor = isTransparent || isDarkMode ? 'text-white' : 'text-gray-900';
    const mutedTextColor = isTransparent || isDarkMode ? 'text-white/70' : 'text-gray-500';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            <div
                className={`overflow-hidden group border-l-4`}
                style={{
                    backgroundColor: isTransparent || isDarkMode ? undefined : selectedColor,
                    borderLeftColor: borderColor
                }}
            >
                <Card className={cardBackground}>
                    {/* Header */}
                    <div className="flex items-start justify-between p-4 pb-2">
                        {isEditing ? (
                            <div className="flex-1 mr-2">
                                <Input
                                    value={editTitle}
                                    onChange={setEditTitle}
                                    placeholder="Note title..."
                                    className={`font-semibold text-lg ${isTransparent || isDarkMode
                                        ? 'bg-white/10 border-white/20 text-white placeholder-white/50'
                                        : 'bg-white/50 border-gray-300'
                                        }`}
                                    autoFocus
                                />
                            </div>
                        ) : (
                            <h3 className={`font-semibold text-lg ${textColor} flex-1`}>
                                {note.title || 'Untitled'}
                            </h3>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {isEditing ? (
                                <>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleSave}
                                        className={`${isTransparent || isDarkMode ? 'text-green-400 hover:bg-green-400/10' : 'text-green-600 hover:bg-green-100'}`}
                                    >
                                        <Save className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleCancel}
                                        className={`${isTransparent || isDarkMode ? 'text-red-400 hover:bg-red-400/10' : 'text-red-600 hover:bg-red-100'}`}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsEditing(true)}
                                        className={`${isTransparent || isDarkMode ? 'text-white/70 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDelete(note.id)}
                                        className={`${isTransparent || isDarkMode ? 'text-red-400 hover:bg-red-400/10' : 'text-red-600 hover:bg-red-100'}`}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-4">
                        {isEditing ? (
                            <div className="space-y-3">
                                <TextArea
                                    value={editContent}
                                    onChange={setEditContent}
                                    placeholder="Write your note..."
                                    rows={4}
                                    className={`${isTransparent || isDarkMode
                                        ? 'bg-white/10 border-white/20 text-white placeholder-white/50'
                                        : 'bg-white/50 border-gray-300'
                                        }`}
                                />

                                {/* Color Picker */}
                                <div className="relative">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowColorPicker(!showColorPicker)}
                                        className={`${isTransparent || isDarkMode ? 'text-white/70 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        <div
                                            className="w-4 h-4 rounded-full mr-2 border-2 border-current"
                                            style={{ backgroundColor: selectedColor }}
                                        />
                                        Change Color
                                    </Button>

                                    <AnimatePresence>
                                        {showColorPicker && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className={`absolute top-full left-0 mt-2 p-3 rounded-lg shadow-lg z-10 ${isTransparent
                                                    ? 'bg-white/20 backdrop-blur-md border border-white/30'
                                                    : isDarkMode
                                                        ? 'bg-gray-800 border border-gray-600'
                                                        : 'bg-white border border-gray-200'
                                                    }`}
                                            >
                                                <div className="grid grid-cols-3 gap-2">
                                                    {colorOptions.map((color) => (
                                                        <motion.button
                                                            key={color.value}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => {
                                                                setSelectedColor(color.value);
                                                                setShowColorPicker(false);
                                                            }}
                                                            className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.value
                                                                ? 'border-current ring-2 ring-offset-2 ring-current'
                                                                : 'border-gray-300'
                                                                }`}
                                                            style={{ backgroundColor: color.value }}
                                                            title={color.name}
                                                        />
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ) : (
                            <div className={`${textColor} whitespace-pre-wrap`}>
                                {note.content || (
                                    <span className={mutedTextColor}>No content</span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {!isEditing && (
                        <div className={`px-4 pb-4 flex items-center gap-2 text-xs ${mutedTextColor}`}>
                            <Calendar className="w-3 h-3" />
                            <span>Updated {formatDate(note.updatedAt)}</span>
                        </div>
                    )}
                </Card>
            </div>
        </motion.div>
    );
};