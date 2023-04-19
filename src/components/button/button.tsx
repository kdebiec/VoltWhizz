import React, { MouseEvent } from 'react';
import buttonModule from './button.module.css';

export interface ButtonProps {
    children: string;
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', onClick}) => (
    <button className={`${className} ${buttonModule.button}`} onClick={onClick}>{children}</button>
);