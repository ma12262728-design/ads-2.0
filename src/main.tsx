import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

window.addEventListener('error', (e) => {
  console.error("Global Error Caught:", e.message, e.filename, e.lineno);
  document.body.innerHTML += `<div style="color:red; background:white; padding: 10px; position:absolute; top:0; z-index:99999;">${e.message}</div>`;
});

try {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (error: any) {
  document.body.innerHTML += `<div style="color:red; background:white; padding: 10px; position:absolute; top:0; z-index:99999;">React Render Error: ${error.message}</div>`;
}
