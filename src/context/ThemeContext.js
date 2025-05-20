import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Detect user's system preference on initial load
  useEffect(() => {
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(userPrefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", userPrefersDark ? "dark" : "light");
  }, []);

  // Toggle theme and update `data-theme` attribute
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};