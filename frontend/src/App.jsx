import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import { publicRoutes } from "@/routes/routes";
import "./app.css";
import HeaderOnly from "@/layout/headerOnly/HeaderOnly";
import { useEffect } from "react";
// import SessionExpiredModal from "./components/SessionExpiredModal/SessionExpiredModal";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100, // offset (in px) from the original trigger point
      duration: 800, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      {/* <SessionExpiredModal /> */}
      <div className="app">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = HeaderOnly;
            if (route.layout) {
              Layout = route.layout;
            } else {
              Layout = HeaderOnly;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
