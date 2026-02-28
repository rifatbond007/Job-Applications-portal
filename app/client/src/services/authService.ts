const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

class AuthService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}/users${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add token to headers if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token in localStorage
    localStorage.setItem('token', response.token);
    
    return response;
  }

  async register(userData: RegisterRequest): Promise<UserResponse> {
    const response = await this.request<UserResponse>('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    return response;
  }

  async verifyEmail(data: VerifyEmailRequest): Promise<{ message: string }> {
    return this.request<{ message: string }>('/verify-email', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async requestEmailVerification(email: string): Promise<{ message: string }> {
    return this.request<{ message: string }>('/request-email-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return this.request<{ message: string }>('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    return this.request<{ message: string }>('/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  }

  async getCurrentUser(): Promise<UserResponse | null> {
    try {
      return await this.request<UserResponse>('/me');
    } catch (error) {
      // If token is invalid, remove it
      localStorage.removeItem('token');
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export const authService = new AuthService();
