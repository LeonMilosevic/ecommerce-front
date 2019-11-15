import React, { useContext } from "react";
// import state
import ProductContext from "../../context/product/ProductContext";
// import bootstrap
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
// import icons
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const productContext = useContext(ProductContext);

  const { searchState, handleChangeSearch, onSubmitSearch } = productContext;

  return (
    <Nav className="mx-auto">
      <Form inline className="custom-search" onSubmit={onSubmitSearch}>
        <Form.Control
          onChange={handleChangeSearch}
          type="search"
          value={searchState.search}
          placeholder="Search"
          style={{
            height: "34px",
            width: "588px",
            borderRadius: "20px",
            borderColor: "#1c252a"
          }}
        />
        <button id="search-button" className="btn-searchbar">
          <FaSearch
            className="icon-search"
            style={{ fontSize: "18px", color: "#595959" }}
          />
        </button>
      </Form>
    </Nav>
  );
};

export default Search;
