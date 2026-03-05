import { useEffect, useState, useRef } from 'react';
import { useStore } from './store';

export const SaveStatus = () => {
    const lastChange = useStore((state) => state.lastChange);
    const [status, setStatus] = useState('Synced');
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Don't show "Saving..." on the very first load
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setStatus('Saving...');
        const timeout = setTimeout(() => {
            setStatus('Changes saved');
        }, 800);

        return () => clearTimeout(timeout);
    }, [lastChange]);

    return (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: '#64748b',
            fontSize: '12px',
            marginLeft: '20px',
            padding: '4px 12px',
            borderRadius: '20px',
            backgroundColor: '#f1f5f9',
            border: '1px solid #e2e8f0',
            transition: 'all 0.3s ease'
        }}>
            <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: status === 'Saving...' ? '#f59e0b' : '#10b981',
                boxShadow: status === 'Saving...' ? '0 0 8px #f59e0b' : 'none'
            }} />
            <span style={{ fontWeight: '500' }}>{status}</span>
        </div>
    );
};

