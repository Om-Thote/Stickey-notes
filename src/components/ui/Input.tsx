// src/components/ui/Input.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface InputProps {
    type?: 'text' | 'email' | 'password' | 'search';
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    onKeyPress?: (e: React.KeyboardEvent) => void;
    className?: string;
    disabled?: boolean;
    autoFocus?: boolean;
}

export const Input: React.FC<InputProps> = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    onKeyPress,
    className = '',
    disabled = false,
    autoFocus = false
}) => {
    const baseClasses = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

    const classes = `${baseClasses} ${className}`;

    return (
        <motion.input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={onKeyPress}
            className={classes}
            disabled={disabled}
            autoFocus={autoFocus}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
    );
};

interface TextAreaProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
    disabled?: boolean;
    rows?: number;
    autoFocus?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
    placeholder,
    value,
    onChange,
    className = '',
    disabled = false,
    rows = 4,
    autoFocus = false
}) => {
    const baseClasses = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed resize-none';

    const classes = `${baseClasses} ${className}`;

    return (
        <motion.textarea
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={classes}
            disabled={disabled}
            rows={rows}
            autoFocus={autoFocus}
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
    );
};