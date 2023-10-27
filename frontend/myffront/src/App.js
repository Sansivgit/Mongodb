import "./App.css";
import { Routes, Route } from "react-router-dom";
import Registration from "./component/register/Registration";
import Login from "./component/login/Login";
import Dashboard from "./component/dashboard/Dashboard";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/:id" element={<Dashboard/>}/>

      </Routes>
    </div>
  );
}

export default App;
