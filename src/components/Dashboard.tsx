import React, { useState } from 'react';
import { useNotes } from '../Hooks/useNotes';
import AddButton from './AddButton';
import AddNoteCard from './AddNoteCard';
import Card from './Card';
import EmptyState from './EmptyState';
import OpacitySlider from './OpacitySlider';

const Dashboard: React.FC = () => {
    const { notes, addNote, deleteNote } = useNotes();
    const [showAddForm, setShowAddForm] = useState(false);
    const [opacity, setOpacity] = useState(100);

    const handleAddNote = (formData: { title: string; content: string }) => {
        addNote(formData);
        setShowAddForm(false);
    };

    const handleCancelAdd = () => {
        setShowAddForm(false);
    };

    const getRandomPosition = (index: number) => {
        const padding = 20;
        const maxX = window.innerWidth - 320;
        const maxY = window.innerHeight - 250;

        const baseX = 50 + (index * 30) % (maxX - 100);
        const baseY = 100 + (index * 40) % (maxY - 200);

        return {
            x: Math.max(padding, Math.min(baseX, maxX)),
            y: Math.max(padding, Math.min(baseY, maxY))
        };
    };

    const opacityValue = opacity / 100;

    return (
        <div className="min-h-screen bg-gray-50 overflow-hidden">
            <div
                className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 p-4"
                style={{ opacity: opacityValue }}
            >
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
                    <div className="flex items-center gap-4">
                        <OpacitySlider
                            opacity={opacity}
                            onChange={setOpacity}
                        />
                        <AddButton onClick={() => setShowAddForm(true)} />
                    </div>
                </div>
            </div>

            {showAddForm && (
                <div
                    className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-md px-4"
                    style={{ opacity: opacityValue }}
                >
                    <AddNoteCard
                        onSave={handleAddNote}
                        onCancel={handleCancelAdd}
                    />
                </div>
            )}

            <div
                className="relative w-full h-screen pt-20"
                style={{ opacity: opacityValue }}
            >
                {notes.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <EmptyState />
                    </div>
                ) : (
                    <>
                        {notes.map((note, index) => (
                            <Card
                                key={note.id}
                                note={note}
                                onDelete={deleteNote}
                                initialPosition={getRandomPosition(index)}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
