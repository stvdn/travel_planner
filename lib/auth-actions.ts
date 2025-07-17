import { signIn, signOut } from "@/auth";

export const login = async () => {
  try {
    await signIn("github", { redirectTo: "/" });
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const logout = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
