'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout, initializeAuth } from '../../store/slices/authSlice';
import { moviesAPI, Movie } from '../../lib/api';

// Type guard for API errors with status
interface ApiError extends Error {
  status?: number;
}
import styles from './movies.module.css';

export default function Movies() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Redux state
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
  });
  const [error, setError] = useState('');
  const [searchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;
  
  useEffect(() => {
    // Mark as client-side to avoid hydration mismatch
    setIsClient(true);
    // Initialize auth state
    dispatch(initializeAuth());
  }, [dispatch]);

  const fetchMovies = useCallback(async () => {
    try {
      setError('');
      console.log('Fetching movies...', { isAuthenticated, token: localStorage.getItem('token')?.substring(0, 20) + '...' });
      const response = await moviesAPI.getMovies({
        page: currentPage,
        limit: moviesPerPage,
        search: searchTerm || undefined,
      });
      setMovies(response.data);
      setPagination(response.pagination);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
      // Check for unauthorized response
      if (err instanceof Error && 
          (((err as ApiError).status === 401) || err.message.includes('401') || err.message.includes('Unauthorized'))) {
        console.log('Unauthorized error detected, redirecting to login');
        dispatch(logout());
        router.push('/login');
      }
    }
  }, [currentPage, moviesPerPage, searchTerm, dispatch, router, isAuthenticated]);

  // Redirect if not authenticated
  useEffect(() => {
    if (isClient && !isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
      router.push('/login');
      return;
    }
    
    if (isClient && isAuthenticated) {
      console.log('User authenticated, fetching movies');
      fetchMovies();
    }
  }, [currentPage, searchTerm, router, isClient, isAuthenticated, fetchMovies]);
  
  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };
  
  const handleAddMovie = () => {
    router.push('/movies/create');
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEditMovie = (movieId: string) => {
    router.push(`/movies/create?edit=${movieId}`);
  };

  // Show loading while checking authentication
  if (!isClient || (isClient && !isAuthenticated)) {
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
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <h1>Error loading movies</h1>
          <p>{error}</p>
          <button onClick={fetchMovies} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (movies.length === 0 && !searchTerm) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h1 className={styles.emptyTitle}>Your movie list is empty</h1>
          <button onClick={handleAddMovie} className={styles.addButton}>
            Add a new movie
          </button>
        </div>
      </div>
    );
  }

  // Movies list view
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>My movies</h1>
          <button onClick={handleAddMovie} className={styles.addIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5-5-5m5 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </header>

      <main className={styles.main}>
        {movies.length === 0 && searchTerm && (
          <div className={styles.noResults}>
            <p>No movies found for &quot;{searchTerm}&quot;</p>
          </div>
        )}
        
        {movies.length > 0 && (
          <>
            <div className={styles.moviesGrid}>
              {movies.map((movie: Movie) => (
                <div key={movie._id || movie.id} className={styles.movieCard}>
                  <div className={styles.movieImage}>
                    <Image 
                      src={movie.imageUrl || '/placeholder-movie.png'} 
                      alt={movie.title}
                      width={400}
                      height={600}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-movie.png';
                      }}
                    />
                    <button 
                      className={styles.editButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        const movieId = movie._id || movie.id;
                        if (movieId) {
                          handleEditMovie(movieId.toString());
                        }
                      }}
                      title="Edit movie"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path 
                          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className={styles.movieInfo}>
                    <h3 className={styles.movieTitle}>{movie.title}</h3>
                    <p className={styles.movieYear}>
                      {movie.releaseDate 
                        ? new Date(movie.releaseDate).getFullYear()
                        : 'No year'
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className={styles.pagination}>
                <button 
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className={styles.paginationButton}
                >
                  Prev
                </button>
                
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`${styles.paginationButton} ${pagination.page === page ? styles.active : ''}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className={styles.paginationButton}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
} 