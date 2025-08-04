import config from "../config/config";

import Home from "../pages/Home";
import Search from "../pages/Search";
import About from "../pages/About";
import Pages from "../pages/Pages";
import Menu from "../pages/Menu";
import DefaultLayout from "../layout/defaultLayout/DefaultLayout";
import Contact from "../pages/Contact";
import BlogDetail from "../pages/BlogDetails";

const publicRoutes = [
  { path: config.routes.home, component: Home },

  { path: config.routes.pages, component: Pages },
  { path: config.routes.blogDetail, component: BlogDetail },
  { path: config.routes.menu, component: Menu, layout: DefaultLayout },
  { path: config.routes.about, component: About },
  { path: config.routes.about, component: About },
  { path: config.routes.search, component: Search },
  { path: config.routes.contact, component: Contact },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
