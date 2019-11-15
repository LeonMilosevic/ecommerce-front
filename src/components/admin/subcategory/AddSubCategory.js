import React, { Fragment, useContext } from "react";
// import components
import AdminContext from "../../../context/admin/AdminContext";
// import bootstrap
import Form from "react-bootstrap/Form";

const AddSubCategory = () => {
  const adminContext = useContext(AdminContext);
  const {
    subCategoryName,
    productCategories,
    clickSubmitSubCategory,
    handleChangeSubCategory,
    subCategoryShowSuccess,
    subCategoryShowError,
    isLoading
  } = adminContext;
  const categoryForm = () => (
    <div className="container pb-5 text-center">
      {subCategoryShowSuccess()}
      {subCategoryShowError()}
      <Form onSubmit={clickSubmitSubCategory}>
        <Form.Control
          className="form-width-custom mt-5"
          placeholder="add category name"
          onChange={handleChangeSubCategory("name")}
          value={subCategoryName}
        />
        <Form.Group>
          <Form.Label>Categories</Form.Label>
          <Form.Control
            as="select"
            onChange={handleChangeSubCategory("category")}
          >
            <option>Please Select</option>
            {productCategories &&
              productCategories.map((c, i) => (
                <option value={c._id} key={i}>
                  {c.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        {isLoading()}
        <button className="btn btn-custom mt-4 mr-2" type="submit">
          Create Sub Category
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

export default AddSubCategory;
