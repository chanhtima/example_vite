import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import Home from "./pages/Home";
import Chart from "./pages/Chart";
import Form from "./pages/Form";
import Editor from "./pages/Editor";
import Table from "./pages/Table";


export default function App() {

  // const isAuthenticated = !!localStorage.getItem("token");
  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<UserLayout />}>
             <Route index element={<Home/> } />
             <Route path="/chart" element={<Chart/>} />
             <Route path="/form" element={<Form/>} />
             <Route path="/editor" element={<Editor/>} />
             <Route path="/table" element={<Table/>} />
             <Route path="*" element={<Navigate to="/" />} />
          </Route>
       </Routes>
    </BrowserRouter>
  
  )
}
