import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#333' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#666' }}>Page Not Found</h2>
      <p style={{ marginBottom: '2rem', color: '#888' }}>
        The page you are looking for does not exist.
      </p>
      <Link 
        href="/movies" 
        style={{
          padding: '12px 24px',
          backgroundColor: '#0070f3',
          color: 'white',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: '500'
        }}
      >
        Go to Movies
      </Link>
    </div>
  );
} 