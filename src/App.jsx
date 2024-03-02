import Home from "./home/Home";
import AdminApp from "./admin/AdminApp";
import { Routes,Route } from "react-router-dom";
import ErrorPagina from "./components/ErrorPagina";
import PrivateRouter from "./admin/AdminComponents/login/PrivateRouter";
import Reports from "./components/Reports";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/Admin/*" element={<PrivateRouter><AdminApp /></PrivateRouter>} />
      <Route path="/Reportes" element={<Reports></Reports>}></Route>
      <Route path="/*" element={<ErrorPagina />}></Route>
    </Routes>
    </>
  );
}

export default App;
