import React, { useContext, useEffect } from "react";
// import components
import AdminContext from "../../../context/admin/AdminContext";
// import bootstrap
import Form from "react-bootstrap/Form";

const UpdateProduct = props => {
  const adminContext = useContext(AdminContext);
  // destructure product from context
  const {
    populateUpdateProduct,
    updateProduct,
    clickSubmitUpdateProduct,
    handleChangeUpdateProduct,
    productShowError,
    productShowSuccess,
    isLoading
  } = adminContext;

  useEffect(() => {
    populateUpdateProduct(props.match.params.productId);
  }, []);

  // product from
  const updateProductForm = () => (
    <Form
      onSubmit={e => clickSubmitUpdateProduct(e, props.match.params.productId)}
    >
      {productShowError()}
      {productShowSuccess()}
      <h4 className="text-center">Post Photo</h4>
      <Form.Group>
        <Form.Label>Upload Photos</Form.Label>
        <Form.Control
          onChange={handleChangeUpdateProduct("photo1")}
          type="file"
          name="photo1"
          accept="image/*"
        />
        <Form.Control
          onChange={handleChangeUpdateProduct("photo2")}
          type="file"
          name="photo2"
          accept="image/*"
        />
        <Form.Control
          onChange={handleChangeUpdateProduct("photo3")}
          type="file"
          name="photo3"
          accept="image/*"
        />
        <Form.Control
          onChange={handleChangeUpdateProduct("photo4")}
          type="file"
          name="photo4"
          accept="image/*"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={handleChangeUpdateProduct("name")}
          type="text"
          value={updateProduct.name && updateProduct.name}
          placeholder={updateProduct.name && updateProduct.name}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>About</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          onChange={handleChangeUpdateProduct("about")}
          type="text"
          value={updateProduct.about && updateProduct.about}
          placeholder={updateProduct.about && updateProduct.about}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          onChange={handleChangeUpdateProduct("price")}
          type="number"
          value={updateProduct.price && updateProduct.price}
          placeholder={updateProduct.price && updateProduct.price}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Sold</Form.Label>
        <Form.Control
          onChange={handleChangeUpdateProduct("sold")}
          type="number"
          value={updateProduct.sold && updateProduct.sold}
          placeholder={updateProduct.sold && updateProduct.sold}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Categories</Form.Label>
        <Form.Control
          as="select"
          onChange={handleChangeUpdateProduct("category")}
        >
          <option>Please Select</option>
          {updateProduct.categories &&
            updateProduct.categories.map((c, i) => (
              <option value={c._id} key={i}>
                {c.name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Sub Categories</Form.Label>
        <Form.Control
          as="select"
          onChange={handleChangeUpdateProduct("subCategory")}
        >
          <option>Please Select</option>
          {updateProduct.subCategories &&
            updateProduct.subCategories.map((c, i) => (
              <option value={c._id} key={i}>
                {c.name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>On Sale</Form.Label>
        <Form.Control
          as="select"
          onChange={handleChangeUpdateProduct("onSale")}
        >
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Product Quantity</Form.Label>
        <Form.Control
          onChange={handleChangeUpdateProduct("quantity")}
          type="number"
          value={updateProduct.quantity}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Product Color</Form.Label>
        <Form.Control
          onChange={handleChangeUpdateProduct("color")}
          type="text"
          value={updateProduct.color}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Product Size</Form.Label>
        <Form.Control as="select" onChange={handleChangeUpdateProduct("size")}>
          <option>Please select</option>
          <option value="xs">XS</option>
          <option value="s">S</option>
          <option value="m">M</option>
          <option value="l">L</option>
          <option value="xl">XL</option>
          <option value="xxl">XXL</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Instructions</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          onChange={handleChangeUpdateProduct("instructions")}
          type="text"
          value={updateProduct.instructions && updateProduct.instructions}
          placeholder={updateProduct.instructions && updateProduct.instructions}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Product Brand</Form.Label>
        <Form.Control
          onChange={handleChangeUpdateProduct("brand")}
          type="text"
          value={updateProduct.brand && updateProduct.brand}
          placeholder={updateProduct.brand && updateProduct.brand}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Brand Description</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          onChange={handleChangeUpdateProduct("brandDescription")}
          type="text"
          value={
            updateProduct.brandDescription && updateProduct.brandDescription
          }
          placeholder={
            updateProduct.brandDescription && updateProduct.brandDescription
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Selections</Form.Label>
        <Form.Control
          as="select"
          onChange={handleChangeUpdateProduct("selection")}
        >
          <option>Please Select</option>
          {updateProduct.selections &&
            updateProduct.selections.map((c, i) => (
              <option value={c._id} key={i}>
                {c.name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Editors Choice</Form.Label>
        <Form.Control
          as="select"
          onChange={handleChangeUpdateProduct("editorsChoice")}
        >
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </Form.Control>
      </Form.Group>
      {isLoading()}
      <div className="text-center">
        <button type="submit" className="btn btn-custom">
          update
        </button>
      </div>
    </Form>
  );
  return <div className="container">{updateProductForm()}</div>;
};

export default UpdateProduct;
