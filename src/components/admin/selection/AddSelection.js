import React, { Fragment, useContext } from "react";
// import components
import AdminContext from "../../../context/admin/AdminContext";
// import bootstrap
import Form from "react-bootstrap/Form";

const AddSelection = () => {
  const adminContext = useContext(AdminContext);
  const {
    selectionName,
    clickSubmitSelection,
    handleChangeSelection,
    selectionShowSuccess,
    selectionShowError,
    isLoading
  } = adminContext;
  const selectionForm = () => (
    <div className="container pb-5 text-center">
      {selectionShowSuccess()}
      {selectionShowError()}
      <Form onSubmit={clickSubmitSelection}>
        <Form.Label>Upload Photos</Form.Label>
        <Form.Control
          onChange={handleChangeSelection("photo")}
          type="file"
          name="photo"
          accept="image/*"
        />
        <Form.Control
          className="form-width-custom mt-5"
          placeholder="add selection name"
          onChange={handleChangeSelection("name")}
          value={selectionName}
          name="name"
        />
        {isLoading()}
        <button className="btn btn-custom mt-4 mr-2" type="submit">
          Create selection
        </button>
      </Form>
    </div>
  );

  return <Fragment>{selectionForm()}</Fragment>;
};

export default AddSelection;
