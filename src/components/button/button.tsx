import React from 'react';
import buttonModule from './button.module.css';

export interface ButtonProps {
    children: string;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = ''}) => (
    <button className={`${className} ${buttonModule.button}`}>{children}</button>
);