const API_URL = import.meta.env.VITE_API_URL

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${API_URL}/api/v1/auth/login`,
    REGISTER: `${API_URL}/api/v1/auth/register`,
    REFRESH: `${API_URL}/api/v1/auth/refresh`,
    LOGOUT: `${API_URL}/api/v1/auth/logout`,
    ME: `${API_URL}/api/v1/auth/me`,
  },
  MAP: {
    ELEMENTS: `${API_URL}/api/v1/maps/elements`,
  },
  INCIDENTS: {
    SUBMIT: `${API_URL}/api/v1/incidents`,
  },
}
