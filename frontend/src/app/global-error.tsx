'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log error for debugging
  console.error('Global error:', error);
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f8f9fa'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#e74c3c' }}>
        Something went wrong!
      </h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        An unexpected error occurred.
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