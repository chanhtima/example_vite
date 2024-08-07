import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/styles.css'
import './styles/index.css'
import App from './App.tsx'
import { PrimeReactProvider } from "primereact/api";
import 'primereact/resources/primereact.min.css';                       // core css
import 'primereact/resources/primereact.css';                       // core css
import "primereact/resources/themes/lara-light-cyan/theme.css";// theme
import 'primeflex/primeflex.css';  
import 'primeicons/primeicons.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <PrimeReactProvider>
       <App />
    </PrimeReactProvider>
  </React.StrictMode>,
)
