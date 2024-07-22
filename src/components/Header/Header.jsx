import "./Header.scss";

import React, { useState } from "react";

import CustomerSearch from "./CustomerSearch";
import { FaBars } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { useGetProfileQuery } from "../../context/api/AdminApi";

const Header = ({ setMenu }) => {
  const { data } = useGetProfileQuery();
  console.log(data);
  const [search, setSearch] = useState("");
  return (
    <header>
    
    </header>
  );
};

export default Header;
