import "./Seller.jsx";

import React from "react";
import { useGetSellerByIdQuery } from "../../../context/api/sellerApi.js";
import { useParams } from "react-router-dom";

const Seller = () => {
  const { id } = useParams();
  const { data } = useGetSellerByIdQuery(id);
  console.log(data);
  return <div>Seller</div>;
};

export default Seller;
