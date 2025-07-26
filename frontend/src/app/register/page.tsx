'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  registerUser, 
  validateEmail, 
  validatePassword, 
  setValidationErrors, 
  clearErrors,
  initializeAuth
} from '../../store/slices/authSlice';
import styles from '../login/login.module.css';

export default function Register() {
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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Initialize auth state on component mount
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/movies');
    }
  }, [isAuthenticated, router]);

  // Validation for confirm password
  const validateConfirmPassword = (confirmPass: string): string | null => {
    if (!confirmPass) return 'Please confirm your password';
    if (confirmPass !== password) return 'Passwords do not match';
    return null;
  };

  // Real-time validation
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);
    
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
    
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
    
    const passwordError = validatePassword(value);
    
    if (touched.password) {
      dispatch(setValidationErrors({
        ...validationErrors,
        password: passwordError || undefined,
      }));
    }
    
    // Also validate confirm password if it's been touched
    if (touched.confirmPassword && confirmPassword) {
      const confirmPasswordError = validateConfirmPassword(confirmPassword);
      dispatch(setValidationErrors({
        ...validationErrors,
        password: passwordError || undefined,
        confirmPassword: confirmPasswordError || undefined,
      }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (touched.confirmPassword) {
      const confirmPasswordError = validateConfirmPassword(value);
      dispatch(setValidationErrors({
        ...validationErrors,
        confirmPassword: confirmPasswordError || undefined,
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

  const handleConfirmPasswordBlur = () => {
    setTouched(prev => ({ ...prev, confirmPassword: true }));
    const confirmPasswordError = validateConfirmPassword(confirmPassword);
    if (confirmPasswordError) {
      dispatch(setValidationErrors({
        ...validationErrors,
        confirmPassword: confirmPasswordError,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ email: true, password: true, confirmPassword: true });
    
    // Clear previous errors
    dispatch(clearErrors());
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(registerUser({ email, password })).unwrap();
      // Navigation will be handled by the useEffect when isAuthenticated becomes true
    } catch (error) {
      // Error is already handled by the rejected case in the slice
      console.error('Registration failed:', error);
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
        
        <h1 className={styles.title}>Sign up</h1>
        
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

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={handleConfirmPasswordBlur}
              className={`${styles.input} ${validationErrors.confirmPassword ? styles.inputError : ''}`}
              required
            />
            {validationErrors.confirmPassword && (
              <div className={styles.fieldError}>
                {validationErrors.confirmPassword}
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            className={styles.loginButton} 
            disabled={isLoading || Object.keys(validationErrors).length > 0}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link href="/login" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
} 