export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      textAlign: 'center'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div 
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #0070f3',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
          className="spinner"
        ></div>
        <p style={{ color: '#666' }}>Loading...</p>
      </div>
    </div>
  );
} 