import { AuthContext } from "../AuthContext";
import { useContext } from "react";

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);