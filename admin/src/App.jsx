import "./App.css";
import AddProduct from "./pages/AddProduct/AddProduct";
import ListProduct from "./pages/ListProduct/ListProduct";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/sidebar/Sidebar";

import { Routes as Router, Route, Link } from "react-router-dom";
import EditProduct from "./pages/EditProduct/EditProduct";

function App() {
  return (
    <div className="container-app">
      <Navbar />
      <div className="wrapper-app">
        <Sidebar />
        <div className="content-app">
          <Router>
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/listproduct" element={<ListProduct />} />
            <Route path="/editproduct/:id" element={<EditProduct />} />
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
