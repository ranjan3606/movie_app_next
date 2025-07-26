const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Types
export interface User {
  _id: string;
  id?: number; // For backward compatibility
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Movie {
  _id: string;
  id?: number; // For backward compatibility
  title: string;
  description?: string;
  releaseDate?: string;
  rating?: number;
  imageUrl?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: Pick<User, '_id' | 'email'>;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface PaginatedMovies {
  data: Movie[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateMovieData {
  title: string;
  description?: string;
  releaseDate?: string;
  rating?: number;
  image?: File;
}

export interface QueryMoviesParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Custom error interface with status
interface ApiError extends Error {
  status?: number;
}

// Token management
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
};

export const removeToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user: User): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeCurrentUser = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('user');
};

// API request helper
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      const errorMessage = error.message || `HTTP error! status: ${response.status}`;
      const errorWithStatus: ApiError = new Error(errorMessage);
      errorWithStatus.status = response.status;
      throw errorWithStatus;
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// API request helper for FormData
const apiFormRequest = async <T>(
  endpoint: string,
  formData: FormData,
  method: 'POST' | 'PATCH' = 'POST'
): Promise<T> => {
  const token = getToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    method,
    body: formData,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    setToken(response.access_token);
    setCurrentUser(response.user);
    
    return response;
  },

  register: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    setToken(response.access_token);
    setCurrentUser(response.user);
    
    return response;
  },

  logout: (): void => {
    removeToken();
    removeCurrentUser();
  },
};

// Movies API
export const moviesAPI = {
  getMovies: async (params?: QueryMoviesParams): Promise<PaginatedMovies> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);

    const endpoint = `/movies${queryParams.toString() ? `?${queryParams}` : ''}`;
    return apiRequest<PaginatedMovies>(endpoint);
  },

  getMovie: async (id: string): Promise<Movie> => {
    return apiRequest<Movie>(`/movies/${id}`);
  },

  createMovie: async (data: CreateMovieData): Promise<Movie> => {
    const formData = new FormData();
    formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.releaseDate) formData.append('releaseDate', data.releaseDate);
    if (data.rating !== undefined) formData.append('rating', data.rating.toString());
    if (data.image) formData.append('image', data.image);

    return apiFormRequest<Movie>('/movies', formData, 'POST');
  },

  updateMovie: async (id: string, data: Partial<CreateMovieData>): Promise<Movie> => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description !== undefined) formData.append('description', data.description);
    if (data.releaseDate) formData.append('releaseDate', data.releaseDate);
    if (data.rating !== undefined) formData.append('rating', data.rating.toString());
    if (data.image) formData.append('image', data.image);

    return apiFormRequest<Movie>(`/movies/${id}`, formData, 'PATCH');
  },

  deleteMovie: async (id: string): Promise<Movie> => {
    return apiRequest<Movie>(`/movies/${id}`, {
      method: 'DELETE',
    });
  },
}; 