
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById("root");

if (!root) {
  console.error("Root element not found");
} else {
  try {
    createRoot(root).render(<App />);
    console.log("Application rendered successfully");
  } catch (error) {
    console.error("Failed to render application:", error);
  }
}
