const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Array<{ msg: string; param: string }>;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Request failed",
          errors: data.errors,
        };
      }

      return {
        success: true,
        ...data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  async submitContact(formData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service: string;
    message: string;
  }) {
    return this.request<{ id: number; timestamp: string }>("/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  }

  async getServices() {
    return this.request<Array<any>>("/services");
  }

  async getService(id: string) {
    return this.request<any>(`/services/${id}`);
  }

  async getProducts(category?: string) {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return this.request<Array<any>>(`/products${query}`);
  }

  async getProduct(id: string) {
    return this.request<any>(`/products/${id}`);
  }

  async getProjects(category?: string, year?: number) {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (year) params.append("year", year.toString());
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.request<Array<any>>(`/projects${query}`);
  }

  async getProject(id: string) {
    return this.request<any>(`/projects/${id}`);
  }

  async getBlogPosts(category?: string, author?: string) {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (author) params.append("author", author);
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.request<Array<any>>(`/blog${query}`);
  }

  async getBlogPost(slug: string) {
    return this.request<any>(`/blog/${slug}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;



