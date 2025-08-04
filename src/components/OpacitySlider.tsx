import React from 'react';

interface OpacitySliderProps {
    opacity: number;
    onChange: (opacity: number) => void;
}

const OpacitySlider: React.FC<OpacitySliderProps> = ({ opacity, onChange }) => {
    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Transparency
            </span>
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">10%</span>
                <input
                    type="range"
                    min="10"
                    max="100"
                    value={opacity}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(opacity - 10) / 0.9}%, #e5e7eb ${(opacity - 10) / 0.9}%, #e5e7eb 100%)`
                    }}
                />
                <span className="text-xs text-gray-500">100%</span>
            </div>
            <span className="text-sm font-medium text-gray-700 min-w-[3rem]">
                {opacity}%
            </span>
        </div>
    );
};

export default OpacitySlider;