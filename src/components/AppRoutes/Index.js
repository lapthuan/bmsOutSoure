import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "../../Pages/Dashboard";
import Home from "../../Pages/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/dieukhien" element={<Dashboard />}></Route>

    </Routes>
  );
}
export default AppRoutes;

