import React from 'react'
import { createBoard } from '@wixc3/react-board';
import { Button } from '../../components/button/button';

export default createBoard({
    name: 'General',
    Board: () => <div className="card">
        <input type="password" />
        <Button buttonText="Login" /></div>,
    environmentProps: {
        canvasHeight: 56,
        windowBackgroundColor: '#f9fafb'
    }
});
