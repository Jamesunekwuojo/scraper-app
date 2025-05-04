import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
// Create the AuthContext
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for fetching

  // Simulate fetching the user state from the backend on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/", {
          credentials: "include", // Include cookies for session-based auth
          withCredentials: true,
        });
        if (response.status == 200) {
          const data = await response.data;
          console.log(data);
          setUser(data.user); // Set the user if authenticated
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Signup function
  const signup = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/signup/",
        formData, // This sends the form data to the backend
        { withCredentials: true, credentials: "include" }
      );

      if (response.status === 200) {
        setUser(response.data.user); // Update user context
        return { success: true };
      } else {
        return {
          success: false,
          message: response.data.message || "Signup failed",
        };
      }
    } catch (error) {
      console.error("Error signing up:", error.response || error);
      return {
        success: false,
        message: error.response?.data?.message 
      };
    }
  };

  // Login function
  const login = async (formData) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", formData, {
        withCredentials: true,
        credentials: "include",
      });

      if (response.status == 200) {
        const data = await response.data;
        setUser(data.user); // Set the user data
        return { success: true };
      } else {
        const errorData = await response.data;
        return { success: false, message: errorData.message };
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return { success: false, message: error.data};
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/logout/", {
        withCredentials: true,
        credentials: "include",
      });

      if (response.status == 200) {
        setUser(null); // Clear the user state
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isAuthenticated = !!user;

  // Provide the loading state, user, and methods
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
