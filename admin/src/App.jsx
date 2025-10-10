import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedLayout from "./layout/ProtectedLayout";
import AddProduct from "./pages/products/AddProduct/AddProduct";
import ListProduct from "./pages/products/ListProduct/ListProduct";
import EditProduct from "./pages/products/EditProduct/EditProduct";
import AddCategory from "./pages/categories/AddCategory/AddCategory";
import ListCategory from "./pages/categories/ListCategory/ListCategory";
import EditCategory from "./pages/categories/EditCategory/EditCategory";
import AddBlog from "./pages/blogs/addblog/AddBlog";
import BlogList from "./pages/blogs/listblog/BlogList";
import EditBlog from "./pages/blogs/editblog/editblog";
import ListUser from "./pages/users/ListUser/ListUser";
import EditUser from "./pages/users/EditUser/EditUser";

function App() {
  return (
    <Routes>
      {/* ✅ Layout được bảo vệ bởi AdminRoute */}
      <Route element={<ProtectedLayout />}>
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
        <Route path="/listuser" element={<ListUser />} />
        <Route path="/listuser/:id" element={<EditUser />} />
      </Route>
    </Routes>
  );
}

export default App;
