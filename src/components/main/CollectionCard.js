import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ShopContext from "../../context/shop/ShopContext";
const CollectionCard = ({ collection }) => {
  const shopContext = useContext(ShopContext);
  const { handleSetSubCategory } = shopContext;
  return (
    <>
      <div
        className="card-collection mb-4"
        style={{ backgroundImage: `url(${collection.photoUrl})` }}
      >
        <div className="card-collection-boxname"></div>
        <span className="card-collection-text">{collection.name}</span>
      </div>
      <button className="btn product-btn">
        <Link
          onClick={() => handleSetSubCategory(collection._id, collection.name)}
          className="jumbotron-link-no-style"
          to={`/shop/${collection._id}`}
        >
          Shop now
        </Link>
      </button>
    </>
  );
};

export default CollectionCard;
