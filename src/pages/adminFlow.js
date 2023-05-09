import React from "react";
import AdminFlow from "../components/admin/allUserDetails/adminFlow";
import AdminHeader from "../components/admin/header/adminHeader";
import UserFooter from "../components/loginPageUser/footer/footer";

const AdminFlowPage = () => {
  return (
    <>
      <AdminHeader />
      <AdminFlow />
      <UserFooter />
    </>
  );
};

export default AdminFlowPage;
