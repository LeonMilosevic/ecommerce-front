import React, { useContext, useEffect } from "react";
// import helpers
import moment from "moment";
// import context
import UserContext from "../../../context/user/UserContext";
// import components
import Layout from "./Layout";
import { FaBox } from "react-icons/fa";

const MyOrders = () => {
  const userContext = useContext(UserContext);
  const { initHistory, purchaseHistoryState } = userContext;

  useEffect(() => {
    initHistory();
  }, []);

  const userHistory = () =>
    purchaseHistoryState.length > 0 && (
      <>
        {purchaseHistoryState.map((item, i) => (
          <div key={i} className="account-history-card my-3">
            <div className="account-history-card--grid">
              {item.products.map((product, i) => (
                <div key={i} className="account-history-card--grid_item">
                  <img
                    className="account-history-card--grid--img"
                    src={product.photoUrl[0]}
                  />
                </div>
              ))}
            </div>
            <div className="account-history-card--info_1 text-center">
              <div>
                <h4 className="account-history-card--header">Amount:</h4>
                <p className="account-history-card--sub-header ">
                  &euro; {item.amount.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="account-history-card--info_1 text-center">
              <div>
                <h4 className="account-history-card--header">Where is it?</h4>
                <p className="account-history-card--sub-header ">
                  {item.status}
                </p>
              </div>
              <div>
                <h4 className="account-history-card--header">Order id:</h4>
                <p className="account-history-card--sub-header ">{item._id}</p>
              </div>
              <div>
                <h4 className="account-history-card--header">Ordered:</h4>
                <p className="account-history-card--sub-header ">
                  {moment(item.createdAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </>
    );

  return (
    <Layout
      title={"my orders"}
      subtitle={"View your order history"}
      icon={<FaBox />}
    >
      {userHistory()}
    </Layout>
  );
};

export default MyOrders;
