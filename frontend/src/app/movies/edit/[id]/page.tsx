'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function EditMovie() {
  const router = useRouter();
  const params = useParams();
  
  useEffect(() => {
    // Redirect to create page with edit parameter
    if (params.id) {
      router.replace(`/movies/create?edit=${params.id}`);
    } else {
      router.replace('/movies');
    }
  }, [params.id, router]);

  // Show loading while redirecting
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a4f5c 0%, #2d5a5a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '18px'
    }}>
      Loading movie...
    </div>
  );
} 