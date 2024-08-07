import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import './styles/styles.css'
import { PrimeReactProvider } from "primereact/api";
import 'primereact/resources/primereact.css';                       // core css
import 'primereact/resources/primereact.min.css';                       // core css
import "primereact/resources/themes/lara-light-cyan/theme.css";// theme
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <PrimeReactProvider>
       <App />
    </PrimeReactProvider>
  </React.StrictMode>,
)
