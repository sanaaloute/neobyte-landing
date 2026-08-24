export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  website?: string; // honeypot — must stay empty
  lang?: "en" | "fr"; // site language, used for the auto-confirmation email
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
  errors?: Array<{ msg: string; param: string }>;
}

// Posts to the relative /api/contact path; Next.js rewrites proxy it to the
// backend (see next.config.ts).
export async function submitContact(
  formData: ContactFormData
): Promise<ContactResponse> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

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
  } catch {
    return {
      success: false,
      error: "Network error",
    };
  }
}
