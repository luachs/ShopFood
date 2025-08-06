import config from "@/config/config";

import Home from "@/pages/Home/Home";
import Search from "@/pages/Search";
import About from "@/pages/About/About";
import Blog from "@/features/Blog/pages/Blog.jsx";
import Menu from "@/features/Menu/pages/Menu.jsx";
import DefaultLayout from "@/layout/defaultLayout/DefaultLayout";
import Contact from "@/pages/Contact/Contact";
import BlogDetail from "@/pages/BlogDetails";
import Checkout from "@/pages/Checkout/Checkout";

const publicRoutes = [
  { path: config.routes.home, component: Home },

  { path: config.routes.blog, component: Blog },
  { path: config.routes.blogDetail, component: BlogDetail },
  { path: config.routes.menu, component: Menu, layout: DefaultLayout },
  { path: config.routes.about, component: About },
  { path: config.routes.about, component: About },
  { path: config.routes.search, component: Search },
  { path: config.routes.contact, component: Contact },
  { path: config.routes.checkout, component: Checkout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
