import React, { useContext, useEffect } from "react";
// import context
import UserContext from "../../../context/user/UserContext";
// import components
import Layout from "./Layout";
// import helpers
import { FaRegAddressCard } from "react-icons/fa";
import { isAuthenticated } from "../../auth";

const AccountDetails = () => {
  const userContext = useContext(UserContext);

  const { init } = userContext;

  const { user } = isAuthenticated();
  useEffect(() => {
    init();
  }, []);

  const accountForm = () => (
    <div className="container pb-5">
      <form>
        <div className="mt-5">
          <p className="account-my-details-label">email address:</p>
          <p className="account-my-details-input-email mt-1">{user.email}</p>
        </div>
        <div className="form-group">
          <label className="account-my-details-label">
            Change your account Name
          </label>
          <input className="form-control form-width-custom" type="text" />
          Your current account name is: {user.name}
        </div>

        <div className="form-group">
          <label className="account-my-details-label">Old password</label>
          <input className="form-control form-width-custom" type="password" />
        </div>

        <div className="form-group">
          <label className="account-my-details-label">New password</label>
          <input className="form-control form-width-custom" type="password" />
        </div>

        <div className="form-group">
          <label className="account-my-details-label">
            Repeat new password
          </label>
          <input className="form-control form-width-custom" type="password" />
        </div>

        <button className="btn btn-custom mr-2">Save changes</button>
        <button
          style={{ backgroundColor: "#e95b4e" }}
          className="btn btn-custom"
          type="submit"
        >
          Discard Changes
        </button>
      </form>
    </div>
  );

  return (
    <Layout
      title={"my details"}
      subtitle={"View your personal information"}
      icon={<FaRegAddressCard />}
    >
      {accountForm()}
    </Layout>
  );
};

export default AccountDetails;
