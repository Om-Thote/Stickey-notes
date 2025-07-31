// src/components/ui/Card.tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { CardProps } from '../../types/Note';

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    onClick
}) => {
    const baseClasses = 'bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden';
    const interactiveClasses = onClick ? 'cursor-pointer hover:shadow-xl' : '';

    const classes = `${baseClasses} ${interactiveClasses} ${className}`;

    return (
        <motion.div
            className={classes}
            onClick={onClick}
            whileHover={onClick ? {
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 17 }
            } : {}}
            whileTap={onClick ? { scale: 0.98 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            layout
        >
            {children}
        </motion.div>
    );
};