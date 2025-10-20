import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

// Load initial state from localStorage
const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

// Add this temporarily at the top of AuthProvider to debug
// console.log("Token from storage:", storedToken);
// if (storedToken) {
//   const decoded = jwtDecode(storedToken);
//   console.log("Token decoded:", decoded);
//   console.log("Token expires at:", new Date(decoded.exp * 1000));
//   console.log("Current time:", new Date());
// }

// Helper function to check if token is expired
function isTokenExpired(token) {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    // Check if token is expired (with 30 second buffer)
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // If we can't decode, consider it expired
  }
}

// Check token validity on initial load
const isTokenValid = storedToken && !isTokenExpired(storedToken);

const initialState = {
  user: isTokenValid && storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: isTokenValid && !!storedUser,
  token: isTokenValid ? storedToken : null,
};

// Clear localStorage if token is invalid on initial load
if (!isTokenValid && (storedUser || storedToken)) {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null,
      };
    default:
      throw new Error("Unknown action type");
  }
}

// This is the component export
export function AuthProvider({ children }) {
  const [{ user, isAuthenticated, token }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // This effect syncs the state TO localStorage
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user, token]);

  // Check token expiry periodically (every 60 seconds)
  useEffect(() => {
    if (!token) return;

    // Check immediately when effect runs
    if (isTokenExpired(token)) {
      console.log("Token expired on mount, logging out...");
      dispatch({ type: "logout" });
      return;
    }

    const interval = setInterval(() => {
      console.log("Checking token expiry...");
      if (isTokenExpired(token)) {
        console.log("Token expired during interval check, logging out...");
        dispatch({ type: "logout" });
      }
    }, 60000); // Check every 60 seconds

    return () => {
      console.log("Cleaning up token check interval");
      clearInterval(interval);
    };
  }, [token]);

  function login(userData) {
    // Verify token is valid before logging in
    if (userData.token && isTokenExpired(userData.token)) {
      throw new Error("Received expired token");
    }
    dispatch({ type: "login", payload: userData });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
