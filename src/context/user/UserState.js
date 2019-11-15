import React, { useState } from "react";
import UserContext from "./UserContext";
// import helpers
import { isAuthenticated } from "../../components/auth";
import {
  read,
  update,
  updateUser,
  getPurchaseHistory
} from "../../components/user/apiUser";

const UserState = props => {
  const [userState, setUserState] = useState({
    name: "",
    oldPassword: "",
    newPassword: "",
    error: "",
    loading: false,
    success: false
  });
  const [userAddress, setUserAddress] = useState({});
  const [purchaseHistoryState, setPurchaseHistoryState] = useState([]);

  const { user, token } = isAuthenticated();

  // ---INIT---
  const init = () => {
    setUserState({ ...userState, loading: true });
    read(user._id, token).then(data => {
      if (data.error)
        return setUserState({
          ...userState,
          error: data.error,
          loading: false
        });

      setUserState({
        ...userState,
        name: data.name,
        loading: false
      });
      setUserAddress(data.address);
    });
  };
  const initHistory = () => {
    getPurchaseHistory(user._id, token).then(data => {
      if (data.error) return console.log(data.error);
      setPurchaseHistoryState(data);
    });
  };
  // ---END OF INIT---
  // --- HANDLE FUNCTIONS ---
  const handleChangeUpdateUser = name => e => {
    setUserAddress({ ...userAddress, [name]: e.target.value });
  };

  const clickSubmitUpdateUser = e => {
    e.preventDefault();
    setUserState({ ...userState, loading: true });
    update(user._id, token, userAddress).then(data => {
      if (data.error)
        return setUserState({
          ...userState,
          error: data.error,
          loading: false
        });

      updateUser(data, () => {
        setUserAddress({ ...userAddress, userAddress: data.address });
        setUserState({ ...userState, loading: false, success: true });
        setTimeout(() => {
          setUserState({ ...userState, success: false });
        }, 5000);
      });
    });
  };

  const clearFields = e => {
    e.preventDefault();

    setUserAddress(isAuthenticated().user.address);
  };
  // --- END OF HANDLE FUNCTIONS ---
  const showSuccess = () => (
    <div className="aler alert-success text-center">
      <h5 style={{ textTransform: "capitalize", padding: "20px" }}>
        Update Success
      </h5>
    </div>
  );
  return (
    <UserContext.Provider
      value={{
        //states
        userState,
        purchaseHistoryState,
        userAddress,
        // funcs
        handleChangeUpdateUser,
        clickSubmitUpdateUser,
        init,
        initHistory,
        showSuccess,
        clearFields
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
