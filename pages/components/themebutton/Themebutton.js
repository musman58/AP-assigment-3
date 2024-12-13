import { useTheme } from "../ThemeContext/ThemeContext";
import styles from "@/styles/Home.module.css";

// components/ThemeToggle.js

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} style={{ marginTop: '20px' }} className={styles.butto}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}
