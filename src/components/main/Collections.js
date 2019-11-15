import React, { useContext } from "react";
// import context
import ProductContext from "../../context/product/ProductContext";
// import components
import CollectionCard from "./CollectionCard";

const Collections = () => {
  const productContext = useContext(ProductContext);

  const { collections } = productContext;

  return (
    <div className="container">
      <h1 className="text-center">See all collections</h1>
      <div className="row">
        {collections.map((c, i) => (
          <div className="col-4 text-center">
            <CollectionCard collection={c} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
