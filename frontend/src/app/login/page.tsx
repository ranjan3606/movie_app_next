'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  loginUser, 
  validateEmail, 
  validatePassword, 
  setValidationErrors, 
  clearErrors,
  initializeAuth
} from '../../store/slices/authSlice';
import styles from './login.module.css';

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Redux state
  const { 
    isLoading, 
    error, 
    validationErrors, 
    isAuthenticated 
  } = useAppSelector((state) => state.auth);

  // Local form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // Initialize client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize auth state on component mount (client-side only)
  useEffect(() => {
    if (isClient) {
      dispatch(initializeAuth());
    }
  }, [dispatch, isClient]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isClient && isAuthenticated) {
      router.push('/movies');
    }
  }, [isAuthenticated, router, isClient]);

  // Real-time validation
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    
    dispatch(setValidationErrors(errors));
    return Object.keys(errors).length === 0;
  };

  // Handle input changes with validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (touched.email) {
      const emailError = validateEmail(value);
      dispatch(setValidationErrors({
        ...validationErrors,
        email: emailError || undefined,
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    if (touched.password) {
      const passwordError = validatePassword(value);
      dispatch(setValidationErrors({
        ...validationErrors,
        password: passwordError || undefined,
      }));
    }
  };

  // Handle input blur to mark as touched
  const handleEmailBlur = () => {
    setTouched(prev => ({ ...prev, email: true }));
    const emailError = validateEmail(email);
    if (emailError) {
      dispatch(setValidationErrors({
        ...validationErrors,
        email: emailError,
      }));
    }
  };

  const handlePasswordBlur = () => {
    setTouched(prev => ({ ...prev, password: true }));
    const passwordError = validatePassword(password);
    if (passwordError) {
      dispatch(setValidationErrors({
        ...validationErrors,
        password: passwordError,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ email: true, password: true });
    
    // Clear previous errors
    dispatch(clearErrors());
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      // Navigation will be handled by the useEffect when isAuthenticated becomes true
    } catch (error) {
      // Error is already handled by the rejected case in the slice
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <span className={styles.logoO}>O</span>
            <span className={styles.logoT}>T</span>
          </div>
        </div>
        
        <h1 className={styles.title}>Sign in</h1>
        
        {/* API Error Display */}
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className={`${styles.input} ${validationErrors.email ? styles.inputError : ''}`}
              required
            />
            {validationErrors.email && (
              <div className={styles.fieldError}>
                {validationErrors.email}
              </div>
            )}
          </div>
          
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              className={`${styles.input} ${validationErrors.password ? styles.inputError : ''}`}
              required
            />
            {validationErrors.password && (
              <div className={styles.fieldError}>
                {validationErrors.password}
              </div>
            )}
          </div>
          
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>Remember me</span>
            </label>
          </div>
          
          <button 
            type="submit" 
            className={styles.loginButton} 
            disabled={isLoading || Object.keys(validationErrors).length > 0}
          >
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link href="/register" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
} 