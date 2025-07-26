'use client';

import { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { moviesAPI } from '../../../lib/api';
import styles from './create.module.css';

function CreateMovieContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if we're in edit mode
  const editId = searchParams.get('edit');
  const isEditMode = !!editId;

  const [formData, setFormData] = useState({
    title: '',
    publishingYear: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Load movie data if in edit mode
  const loadMovieData = useCallback(async () => {
    try {
      setIsLoading(true);
      const movie = await moviesAPI.getMovie(editId!);

      setFormData({
        title: movie.title || '',
        publishingYear: movie.releaseDate ? new Date(movie.releaseDate).getFullYear().toString() : ''
      });

      if (movie.imageUrl) {
        setCurrentImageUrl(movie.imageUrl);
        setPreviewUrl(movie.imageUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movie');
    } finally {
      setIsLoading(false);
    }
  }, [editId]);

  useEffect(() => {
    if (isEditMode && editId) {
      loadMovieData();
    }
  }, [isEditMode, editId, loadMovieData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (file: File) => {
    // Allow both images and videos
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const isVideo = (url: string) => {
    return url && (url.includes('.mp4') || url.includes('.avi') || url.includes('.mov') || url.includes('.wmv') || url.includes('video'));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    router.push('/movies');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.publishingYear) {
      alert('Please fill in the required fields');
      return;
    }

    try {
      const movieData = {
        title: formData.title,
        releaseDate: `${formData.publishingYear}-01-01T00:00:00.000Z`,
        image: selectedFile || undefined,
      };

      let result;
      if (isEditMode && editId) {
        result = await moviesAPI.updateMovie(editId, movieData);
        console.log('Movie updated:', result);
        alert('Movie updated successfully!');
      } else {
        result = await moviesAPI.createMovie(movieData);
        console.log('Movie created:', result);
        alert('Movie created successfully!');
      }

      router.push('/movies');
    } catch (error) {
      console.error(`Failed to ${isEditMode ? 'update' : 'create'} movie:`, error);
      alert(`Failed to ${isEditMode ? 'update' : 'create'} movie: ${error instanceof Error ? error.message : 'Please try again.'}`);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Loading movie...</h1>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Error loading movie</h1>
          <p style={{ color: 'white', textAlign: 'center' }}>{error}</p>
          <button onClick={handleCancel} className={styles.cancelButton}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {isEditMode ? 'Edit movie' : 'Create a new movie'}
        </h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formContent}>
            {/* File Upload Area */}
            <div className={styles.uploadSection}>
              <div
                className={`${styles.dropZone} ${isDragging ? styles.dragging : ''} ${(selectedFile || currentImageUrl) ? styles.hasFile : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleDropZoneClick}
              >
                {(selectedFile || currentImageUrl) ? (
                  <div className={styles.preview}>
                    {selectedFile ? (
                      selectedFile.type.startsWith('image/') ? (
                        <Image 
                          src={previewUrl} 
                          alt="Preview" 
                          width={400}
                          height={600}
                          style={{ objectFit: 'cover' }}
                          className={styles.previewImage} 
                        />
                      ) : (
                        <video src={previewUrl} controls className={styles.previewVideo} />
                      )
                    ) : (
                      isVideo(currentImageUrl) ? (
                        <video src={currentImageUrl} controls className={styles.previewVideo} />
                      ) : (
                        <Image 
                          src={currentImageUrl} 
                          alt="Current" 
                          width={400}
                          height={600}
                          style={{ objectFit: 'cover' }}
                          className={styles.previewImage} 
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className={styles.dropContent}>
                    <div className={styles.downloadIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className={styles.dropText}>Upload an image here</p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileInputChange}
                className={styles.fileInput}
              />
            </div>

            {/* Form Fields */}
            <div className={styles.fieldsSection}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.yearInputGroup}`}>
                <input
                  type="text"
                  name="publishingYear"
                  placeholder="Publishing year"
                  value={formData.publishingYear}
                  onChange={handleInputChange}
                  className={`${styles.input} ${styles.yearInput}`}
                  pattern="[0-9]{4}"
                  minLength={4}
                  maxLength={4}
                  required
                />
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  {isEditMode ? 'Update' : 'Submit'}
                </button>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default function CreateMovie() {
  return (
    <Suspense fallback={
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
    }>
      <CreateMovieContent />
    </Suspense>
  );
} 