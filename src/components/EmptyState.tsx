import React from 'react';

const EmptyState: React.FC = () => {
    return (
        <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-medium text-gray-500 mb-2">No notes yet</h3>
            <p className="text-gray-400">Click "Add Note" to create your first note</p>
        </div>
    );
};

export default EmptyState;
