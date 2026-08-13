import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css'; 

// Hier greift React auf das leere <div id="root"> in deiner index.html zu
// und übernimmt ab diesem Punkt die Kontrolle über die Webseite.
createRoot(document.getElementById('root')!).render(
  
  // StrictMode ist ein Helfer für die Entwicklungszeit. 
  // Er rendert deine Komponenten absichtlich zweimal hintereinander, 
  // um versteckte Bugs (wie falsche useEffects) sofort aufzudecken.
  // In der finalen Produktion (Build) wird das automatisch deaktiviert.
  <StrictMode>
    
    {/* Unser neuer Provider legt sich wie eine Hülle um die App. 
        Ab sofort kann jede Komponente IN der App einfach den Hook 
        "useAppearance()" aufrufen und das Theme ändern. */}
    
      
      <App />
      
    
    
  </StrictMode>,
);