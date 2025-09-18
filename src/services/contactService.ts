import { apiClient, API_CONFIG } from "@/config/api";
import { ContactFormData, ContactResponse } from "@/types/contact";

export const contactService = {
  // Submit contact form
  async submitContact(data: ContactFormData): Promise<ContactResponse> {
    return apiClient.post<ContactResponse>(API_CONFIG.ENDPOINTS.CONTACT, data);
  },
};
