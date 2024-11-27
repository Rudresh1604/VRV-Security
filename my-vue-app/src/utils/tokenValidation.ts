import { jwtDecode } from "jwt-decode";

export const validateToken = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      // Token expired
      return false;
    }
    return true;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};
