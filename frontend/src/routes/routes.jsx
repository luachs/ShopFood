import config from "@/config/config";

import Home from "@/pages/Home/Home";
import Search from "@/pages/Search/Search";
import About from "@/pages/About/About";
import Blog from "@/features/Blog/pages/Blog.jsx";
import Menu from "@/features/Menu/pages/Menu.jsx";
import DefaultLayout from "@/layout/defaultLayout/DefaultLayout";
import Contact from "@/pages/Contact/Contact";
import BlogDetail from "@/pages/BlogDetails";
import Checkout from "@/features/Checkout/pages/Checkout";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import ProductDetail from "@/features/Menu/pages/ProductDetail/ProductDetail";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.blog, component: Blog },
  { path: config.routes.blogDetail, component: BlogDetail },
  { path: config.routes.menu, component: Menu, layout: DefaultLayout },
  { path: config.routes.productDetail, component: ProductDetail },
  { path: config.routes.about, component: About },
  { path: config.routes.about, component: About },
  { path: config.routes.search, component: Search },
  { path: config.routes.contact, component: Contact },
  { path: config.routes.checkout, component: Checkout },
  { path: config.routes.login, component: Login },
  { path: config.routes.register, component: Register },
  { path: config.routes.search, component: Search },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
