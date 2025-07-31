// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FileText } from 'lucide-react';
import { useNotes } from '../Hooks/useNotes';
import { TopBar } from '../components/topbar';
import { NoteCard } from '../components/NoteCard';
import { Button } from '../components/ui/Button';
import { loadAppStateFromStorage, saveAppStateToStorage } from '../utils/localStorage';

export const Dashboard: React.FC = () => {
    const { notes, loading, addNote, updateNote, deleteNote, searchNotes } = useNotes();
    const [searchQuery, setSearchQuery] = useState('');
    const [isTransparent, setIsTransparent] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load app state from localStorage
    useEffect(() => {
        const appState = loadAppStateFromStorage();
        setIsTransparent(appState.isTransparent);
        setIsDarkMode(appState.isDarkMode);
    }, []);

    // Save app state to localStorage
    useEffect(() => {
        saveAppStateToStorage({ isTransparent, isDarkMode });
    }, [isTransparent, isDarkMode]);

    const handleAddNote = () => {
        addNote({
            title: 'New Note',
            content: '',
            color: '#fef3c7'
        });
    };

    const filteredNotes = searchQuery ? searchNotes(searchQuery) : notes;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.05
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen transition-all duration-500 ${isTransparent
                ? 'transparent-mode'
                : isDarkMode
                    ? 'bg-gray-900'
                    : 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500'
                }`}
        >
            {/* Top Bar */}
            <TopBar
                isTransparent={isTransparent}
                isDarkMode={isDarkMode}
                searchQuery={searchQuery}
                onTransparencyToggle={() => setIsTransparent(!isTransparent)}
                onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
                onSearchChange={setSearchQuery}
                notesCount={notes.length}
            />

            {/* Main Content */}
            <div className="max-w-6xl mx-auto p-6">
                {/* Add Note Button */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
                    className="mb-8"
                >
                    <Button
                        onClick={handleAddNote}
                        className={`${isTransparent
                            ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                            : isDarkMode
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-white text-blue-600 hover:bg-blue-50'
                            } shadow-lg`}
                        size="lg"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Create New Note
                    </Button>
                </motion.div>

                {/* Notes Grid */}
                <AnimatePresence mode="popLayout">
                    {filteredNotes.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filteredNotes.map((note) => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    onUpdate={updateNote}
                                    onDelete={deleteNote}
                                    isTransparent={isTransparent}
                                    isDarkMode={isDarkMode}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center py-20"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${isTransparent
                                    ? 'bg-white/10 text-white'
                                    : isDarkMode
                                        ? 'bg-gray-800 text-gray-400'
                                        : 'bg-white/20 text-white'
                                    }`}
                            >
                                <FileText className="w-12 h-12" />
                            </motion.div>

                            <h3 className={`text-2xl font-semibold mb-4 ${isTransparent || isDarkMode ? 'text-white' : 'text-white'
                                }`}>
                                {searchQuery ? 'No notes found' : 'No notes yet'}
                            </h3>

                            <p className={`text-lg mb-8 ${isTransparent || isDarkMode ? 'text-white/70' : 'text-white/80'
                                }`}>
                                {searchQuery
                                    ? `No notes match "${searchQuery}". Try a different search term.`
                                    : 'Create your first note to get started!'
                                }
                            </p>

                            {!searchQuery && (
                                <Button
                                    onClick={handleAddNote}
                                    size="lg"
                                    className={`${isTransparent
                                        ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                                        : isDarkMode
                                            ? 'bg-blue-600 hover:bg-blue-700'
                                            : 'bg-white text-blue-600 hover:bg-blue-50'
                                        }`}
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Create Your First Note
                                </Button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Add Button (for mobile) */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="fixed bottom-6 right-6 md:hidden"
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAddNote}
                    className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${isTransparent
                        ? 'bg-white/20 text-white border border-white/30'
                        : isDarkMode
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-blue-600'
                        }`}
                >
                    <Plus className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </div>
    );
};