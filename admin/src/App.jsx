import "./App.css";
import AddProduct from "./pages/products/AddProduct/AddProduct";
import ListProduct from "./pages/products/ListProduct/ListProduct";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/sidebar/Sidebar";

import { Routes as Router, Route, Navigate } from "react-router-dom";
import EditProduct from "./pages/products/EditProduct/EditProduct";
import AddCategory from "./pages/categories/AddCategory/AddCategory";
import ListCategory from "./pages/categories/ListCategory/ListCategory";
import EditCategory from "./pages/categories/EditCategory/EditCategory";
import AddBlog from "./pages/blogs/addblog/AddBlog";
import BlogList from "./pages/blogs/listblog/BlogList";
import EditBlog from "./pages/blogs/editblog/editblog";

function App() {
  return (
    <div className="container-app">
      <Navbar />
      <div className="wrapper-app">
        <Sidebar />
        <div className="content-app">
          <Router>
            <Route path="/" element={<Navigate to="/addproduct" replace />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/listproduct" element={<ListProduct />} />
            <Route path="/editproduct/:id" element={<EditProduct />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/listcategory" element={<ListCategory />} />
            <Route path="/editcategory/:id" element={<EditCategory />} />
            <Route path="/addblog" element={<AddBlog />} />
            <Route path="/listblog" element={<BlogList />} />
            <Route path="/editblog/:id" element={<EditBlog />} />
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
