import React, { useContext } from "react";
// import components
import AdminContext from "../../../context/admin/AdminContext";
// import bootstrap
import Form from "react-bootstrap/Form";

const AddProduct = () => {
  const adminContext = useContext(AdminContext);
  // destructure product from context
  const {
    productName,
    productAbout,
    productPrice,
    productQuantity,
    productCategories,
    productSubCategories,
    productSelections,
    productColor,
    productInstructions,
    productBrand,
    productBrandDescription,
    productSold,
    clickSubmitProduct,
    handleChangeProduct,
    productShowError,
    productShowSuccess,
    isLoading
  } = adminContext;
  // product from
  const addProductForm = () => (
    <Form onSubmit={clickSubmitProduct}>
      {productShowError()}
      {productShowSuccess()}
      <h4 className="text-center">Post Photo</h4>
      <Form.Group>
        <Form.Label>Upload Photos</Form.Label>
        <Form.Control
          onChange={handleChangeProduct("photo1")}
          type="file"
          name="photo1"
          accept="image/*"
        />
        <Form.Control
          onChange={handleChangeProduct("photo2")}
          type="file"
          name="photo2"
          accept="image/*"
        />
        <Form.Control
          onChange={handleChangeProduct("photo3")}
          type="file"
          name="photo3"
          accept="image/*"
        />
        <Form.Control
          onChange={handleChangeProduct("photo4")}
          type="file"
          name="photo4"
          accept="image/*"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={handleChangeProduct("name")}
          type="text"
          placeholder="Enter name"
          value={productName}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>About</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          onChange={handleChangeProduct("about")}
          type="text"
          placeholder="Enter about the product"
          value={productAbout}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          onChange={handleChangeProduct("price")}
          type="number"
          placeholder="Enter price"
          value={productPrice}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Sold</Form.Label>
        <Form.Control
          onChange={handleChangeProduct("sold")}
          type="number"
          placeholder="Enter sold"
          value={productSold}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Categories</Form.Label>
        <Form.Control as="select" onChange={handleChangeProduct("category")}>
          <option>Please Select</option>
          {productCategories &&
            productCategories.map((c, i) => (
              <option value={c._id} key={i}>
                {c.name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Sub Categories</Form.Label>
        <Form.Control as="select" onChange={handleChangeProduct("subCategory")}>
          <option>Please Select</option>
          {productSubCategories &&
            productSubCategories.map((c, i) => (
              <option value={c._id} key={i}>
                {c.name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>On Sale</Form.Label>
        <Form.Control as="select" onChange={handleChangeProduct("onSale")}>
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Product Quantity</Form.Label>
        <Form.Control
          onChange={handleChangeProduct("quantity")}
          type="number"
          placeholder="Enter quantity"
          value={productQuantity}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Product Color</Form.Label>
        <Form.Control
          onChange={handleChangeProduct("color")}
          type="text"
          placeholder="Enter color"
          value={productColor}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Product Size</Form.Label>
        <Form.Control as="select" onChange={handleChangeProduct("size")}>
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
          onChange={handleChangeProduct("instructions")}
          type="text"
          placeholder="Enter product instructions"
          value={productInstructions}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Product Brand</Form.Label>
        <Form.Control
          onChange={handleChangeProduct("brand")}
          type="text"
          placeholder="Enter brand"
          value={productBrand}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Brand Description</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          onChange={handleChangeProduct("brandDescription")}
          type="text"
          placeholder="Enter brand description"
          value={productBrandDescription}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Selections</Form.Label>
        <Form.Control as="select" onChange={handleChangeProduct("selection")}>
          <option>Please Select</option>
          {productSelections &&
            productSelections.map((c, i) => (
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
          onChange={handleChangeProduct("editorsChoice")}
        >
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </Form.Control>
      </Form.Group>
      {isLoading()}
      <div className="text-center">
        <button type="submit" className="btn btn-custom">
          create
        </button>
      </div>
    </Form>
  );
  return <div className="container">{addProductForm()}</div>;
};

export default AddProduct;
