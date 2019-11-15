import React, { useContext } from "react";
// import context
import UserContext from "../../../context/user/UserContext";
// import components
import Layout from "./Layout";
import { FaHome } from "react-icons/fa";

const AddressBook = () => {
  const userContext = useContext(UserContext);
  const {
    userState,
    userAddress,
    handleChangeUpdateUser,
    clickSubmitUpdateUser,
    showSuccess,
    clearFields
  } = userContext;

  const addressBookForm = () =>
    userAddress !== {} && (
      <div className="container pb-5">
        <form>
          {userState.success && showSuccess()}
          <div className="form-group mt-5">
            <label className="account-my-details-label">first name</label>
            <input
              className="form-control form-width-custom"
              onChange={handleChangeUpdateUser("firstName")}
              value={userAddress.firstName}
              placeholder={userAddress.firstName}
            />
          </div>
          <div className="form-group mt-3">
            <label className="account-my-details-label">last name</label>
            <input
              className="form-control form-width-custom"
              onChange={handleChangeUpdateUser("lastName")}
              value={userAddress.lastName}
              placeholder={userAddress.lastName}
            />
          </div>
          <div className="mt-3 form-group">
            <label className="account-my-details-label">Country</label>
            <input
              className="form-control form-width-custom"
              onChange={handleChangeUpdateUser("country")}
              value={userAddress.country}
              placeholder={userAddress.country}
            />
          </div>
          <div className="mt-3 form-group">
            <label className="account-my-details-label">full address</label>
            <input
              className="form-control form-width-custom"
              onChange={handleChangeUpdateUser("fullAddress")}
              value={userAddress.fullAddress}
              placeholder={userAddress.fullAddress}
            />
          </div>
          <div className="mt-3 form-group">
            <label className="account-my-details-label">post code</label>
            <input
              className="form-control form-width-custom"
              onChange={handleChangeUpdateUser("postalCode")}
              value={userAddress.postalCode}
              placeholder={userAddress.postalCode}
            />
          </div>
          <div className="mt-3 form-group">
            <label className="account-my-details-label">city</label>
            <input
              className="form-control form-width-custom mt-3"
              onChange={handleChangeUpdateUser("city")}
              value={userAddress.city}
              placeholder={userAddress.city}
            />
          </div>
          <div className="mt-3 form-group">
            <label className="account-my-details-label">mobile</label>
            <input
              className="form-control form-width-custom"
              onChange={handleChangeUpdateUser("mobile")}
              value={userAddress.mobile}
              placeholder={userAddress.mobile}
            />
          </div>

          <button
            onClick={clickSubmitUpdateUser}
            className="btn btn-custom mt-4 mr-2"
          >
            Save changes
          </button>
          <button
            style={{ backgroundColor: "#e95b4e" }}
            className="btn btn-custom mt-4"
            onClick={clearFields}
          >
            Discard Changes
          </button>
        </form>
      </div>
    );

  return (
    <Layout
      title={"my address"}
      subtitle={"View your billing and shippping information"}
      icon={<FaHome />}
    >
      {addressBookForm()}
    </Layout>
  );
};

export default AddressBook;
