import React, { Fragment, useContext } from "react";
// import components
import AdminContext from "../../../context/admin/AdminContext";
// import bootstrap
import Form from "react-bootstrap/Form";

const AddCategory = () => {
  const adminContext = useContext(AdminContext);
  const {
    categoryName,
    clickSubmitCategory,
    handleChangeCategory,
    categoryShowSuccess,
    categoryShowError,
    isLoading
  } = adminContext;
  const categoryForm = () => (
    <div className="container pb-5 text-center">
      {categoryShowError()}
      {categoryShowSuccess()}
      <Form onSubmit={clickSubmitCategory}>
        <Form.Control
          className="form-width-custom mt-5"
          placeholder="add category name"
          onChange={handleChangeCategory}
          value={categoryName}
        />
        {isLoading()}
        <button className="btn btn-custom mt-4 mr-2" type="submit">
          Create Category
        </button>
        <button
          style={{ backgroundColor: "#e95b4e" }}
          className="btn btn-custom mt-4"
          type="submit"
        >
          Discard Changes
        </button>
      </Form>
    </div>
  );

  return <Fragment>{categoryForm()}</Fragment>;
};

export default AddCategory;
