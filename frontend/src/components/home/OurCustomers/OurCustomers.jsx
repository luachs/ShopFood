import React from "react";
import "./OurCustomers.css";

import Avatar1 from "../../assets/images/AvatarCustomer/avatar1.png";
import Avatar2 from "../../assets/images/AvatarCustomer/avatar2.png";
import Avatar3 from "../../assets/images/AvatarCustomer/avatar3.png";

const CustomersRated = [
  {
    title: "“The best restaurant”",
    desc: "Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.",
    avatar: Avatar1,
    name: "Sophire Robson",
    where: "Los Angeles, CA",
  },
  {
    title: "“Simply delicious”",
    desc: "Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.",
    avatar: Avatar2,
    name: "Matt Cannon",
    where: "San Diego, CA",
  },
  {
    title: "“One of a kind restaurant”",
    desc: "Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.",
    avatar: Avatar3,
    name: "Andy Smith",
    where: "San Francisco, CA",
  },
];
const OurCustomers = () => {
  return (
    <div className="our-customers">
      <h1 className="our-customers-title">What Our Customers Say</h1>
      <div className="customer-rated">
        {CustomersRated.map((item, index) => {
          return (
            <div key={index} className="customer-rated-item">
              <h1>{item.title}</h1>
              <p>{item.desc}</p>

              <div className="cart-custom">
                <img src={item.avatar} alt="" />
                <div className="info-custom">
                  <h3>{item.name}</h3>
                  <div>{item.where}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurCustomers;
