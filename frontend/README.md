# Movie Assessment Frontend

This is a Next.js frontend application with Redux Toolkit for state management and comprehensive form validation.

## Features Implemented

### 🔐 Authentication with Redux Toolkit

- **State Management**: Complete Redux Toolkit setup with typed hooks
- **Auth Slice**: Centralized authentication state management
- **Async Actions**: Login and register with proper error handling
- **Persistent State**: Authentication state persists across browser sessions

### ✅ Form Validation

#### Email Validation
- Required field validation
- Email format validation using regex
- Real-time validation feedback

#### Password Validation  
- Required field validation
- Minimum 6 characters requirement
- Real-time validation feedback

#### Confirm Password Validation (Register)
- Required field validation
- Password matching validation
- Real-time validation feedback

### 🎨 User Experience Features

- **Real-time Validation**: Errors show as user types (after first blur)
- **Visual Feedback**: Error states with red borders and warning icons
- **Loading States**: Button disabled during API calls
- **Error Display**: API errors shown prominently
- **Responsive Design**: Works on mobile and desktop

## Project Structure

```
frontend/src/
├── store/
│   ├── store.ts          # Redux store configuration
│   ├── hooks.ts          # Typed Redux hooks
│   └── slices/
│       └── authSlice.ts  # Authentication slice with actions
├── app/
│   ├── providers.tsx     # Redux Provider wrapper
│   ├── layout.tsx        # App layout with Provider
│   ├── login/
│   │   └── page.tsx      # Login form with validation
│   ├── register/
│   │   └── page.tsx      # Register form with validation
│   └── movies/
│       └── page.tsx      # Movies page with auth integration
└── lib/
    └── api.ts           # API functions
```

## Redux Store Structure

### Auth Slice State
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  validationErrors: ValidationErrors;
  isAuthenticated: boolean;
}
```

### Available Actions
- `loginUser` - Async thunk for user login
- `registerUser` - Async thunk for user registration
- `logout` - Clear auth state and localStorage
- `setValidationErrors` - Set form validation errors
- `clearErrors` - Clear all errors
- `initializeAuth` - Initialize auth from localStorage

## Form Validation Examples

### Email Validation
```typescript
export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (!email.trim()) return 'Email cannot be empty';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  
  return null;
};
```

### Password Validation
```typescript
export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters long';
  
  return null;
};
```

## Usage Examples

### Using Redux in Components
```typescript
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser, setValidationErrors } from '../../store/slices/authSlice';

function LoginComponent() {
  const dispatch = useAppDispatch();
  const { isLoading, error, validationErrors } = useAppSelector(state => state.auth);
  
  const handleSubmit = async (email: string, password: string) => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (error) {
      // Error handled by Redux slice
    }
  };
}
```

### Form Validation Integration
```typescript
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
```

## API Integration

The Redux actions automatically handle:
- API calls to backend authentication endpoints
- Token storage in localStorage
- User data persistence
- Error handling and display
- Loading states

## Error Handling

### Client-side Validation
- Email format validation
- Password length validation
- Password confirmation matching
- Real-time feedback

### Server-side Error Handling
- API error messages displayed to user
- Network error handling
- Authentication token expiry handling
- Automatic logout on 401 errors

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Dependencies Added

- `@reduxjs/toolkit` - Modern Redux with less boilerplate
- `react-redux` - React bindings for Redux

## Testing the Features

1. **Form Validation**: Try submitting empty forms or invalid emails
2. **API Errors**: Try logging in with wrong credentials
3. **State Persistence**: Refresh page after login to see persistent state
4. **Real-time Validation**: Type in forms and see immediate feedback
5. **Loading States**: Notice button states during API calls
