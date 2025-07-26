'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Movies page error:', error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#e74c3c' }}>
        Something went wrong!
      </h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Failed to load movies. Please try again.
      </p>
      <button
        onClick={reset}
        style={{
          padding: '12px 24px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500'
        }}
      >
        Try again
      </button>
    </div>
  );
} 