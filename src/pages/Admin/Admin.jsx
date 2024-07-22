import "./Admin.scss";

import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const Admin = ({ menu }) => {
  return (
    <div className={`admin ${menu ? "admin__show" : ""}`}>
      <Sidebar menu={menu} />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
