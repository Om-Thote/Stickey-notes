// src/components/TopBar.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Eye, EyeOff, Moon, Sun, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface TopBarProps {
    isTransparent: boolean;
    isDarkMode: boolean;
    searchQuery: string;
    onTransparencyToggle: () => void;
    onDarkModeToggle: () => void;
    onSearchChange: (query: string) => void;
    notesCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
    isTransparent,
    isDarkMode,
    searchQuery,
    onTransparencyToggle,
    onDarkModeToggle,
    onSearchChange,
    notesCount
}) => {
    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`sticky top-0 z-50 p-4 border-b transition-all duration-300 ${isTransparent
                    ? 'glass-effect border-white/20'
                    : isDarkMode
                        ? 'bg-gray-900 border-gray-700'
                        : 'bg-white border-gray-200'
                }`}
        >
            <div className="max-w-6xl mx-auto">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                    {/* Logo and Title */}
                    <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            className={`p-2 rounded-xl ${isTransparent
                                    ? 'bg-white/20'
                                    : isDarkMode
                                        ? 'bg-blue-600'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600'
                                }`}
                        >
                            <Palette className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                            <h1 className={`text-2xl font-bold ${isTransparent || isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                Quick Notes
                            </h1>
                            <motion.p
                                key={notesCount}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`text-sm ${isTransparent || isDarkMode ? 'text-white/70' : 'text-gray-500'
                                    }`}
                            >
                                {notesCount} {notesCount === 1 ? 'note' : 'notes'}
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Control Buttons */}
                    <div className="flex items-center gap-2">
                        {/* Dark Mode Toggle */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onDarkModeToggle}
                            className={`${isTransparent || isDarkMode
                                    ? 'text-white hover:bg-white/10'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </Button>

                        {/* Transparency Toggle */}
                        <Button
                            variant={isTransparent ? "primary" : "ghost"}
                            size="sm"
                            onClick={onTransparencyToggle}
                            className={`${isTransparent
                                    ? 'bg-white/20 text-white hover:bg-white/30'
                                    : isDarkMode
                                        ? 'text-white hover:bg-gray-700'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {isTransparent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            <span className="ml-2 hidden sm:inline">
                                {isTransparent ? 'Exit Overlay' : 'Overlay Mode'}
                            </span>
                        </Button>
                    </div>
                </div>

                {/* Search Bar */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isTransparent || isDarkMode ? 'text-white/50' : 'text-gray-400'
                        }`} />
                    <Input
                        type="search"
                        placeholder="Search your notes..."
                        value={searchQuery}
                        onChange={onSearchChange}
                        className={`pl-10 ${isTransparent
                                ? 'bg-white/10 border-white/20 text-white placeholder-white/50'
                                : isDarkMode
                                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-gray-50 border-gray-200'
                            }`}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};