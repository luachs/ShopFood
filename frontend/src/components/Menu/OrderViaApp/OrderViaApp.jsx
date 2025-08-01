import React from "react";
import "./OrderViaApp.css";

import Brand1 from "../../assets/images/OrderViaApp/brand1.png";
import Brand2 from "../../assets/images/OrderViaApp/brand2.png";
import Brand3 from "../../assets/images/OrderViaApp/brand3.png";
import Brand4 from "../../assets/images/OrderViaApp/brand4.png";
import Brand5 from "../../assets/images/OrderViaApp/brand5.png";

const OrderViaApp = () => {
  return (
    <div className="order-app">
      <div className="order-app-content">
        <h1>You can order through apps</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui unde, ex
          inventore, expedita vero ab eum ducimus eos eaque quidem voluptate
          fuga odit molestiae, rerum quae optio hic eligendi similique.
        </p>
      </div>
      <div className="order-app-brand">
        <div className="order-app-img">
          <img src={Brand1} alt="" />
        </div>
        <div className="order-app-img">
          <img src={Brand2} alt="" />
        </div>
        <div className="order-app-img">
          <img src={Brand3} alt="" />
        </div>
        <div className="order-app-img">
          <img src={Brand4} alt="" />
        </div>
        <div className="order-app-img">
          <img src={Brand5} alt="" />
        </div>
        <div className="order-app-img">
          <img src={Brand3} alt="" />
        </div>
      </div>
    </div>
  );
};

export default OrderViaApp;
