import React, { useContext } from "react";
// import slider
import Slider from "react-slick";
// import context
import ProductContext from "../../context/product/ProductContext";
// import components
import Card from "./Card";

const EditorsChoice = () => {
  const productContext = useContext(ProductContext);
  const { editorsChoice } = productContext;

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 600, //at 600px wide, only 2 slides will show
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480, //at 480px wide, only one slide will show
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div>
      <div style={{ backgroundColor: "#84BACD" }}>
        <h1 className="pt-3 mt-5 editorschoice-header text-center">
          Editor's Choice
        </h1>
        <div className="container">
          <div style={{ width: "80%" }} className="row mx-auto">
            <Slider className="mb-5 mt-3 mx-auto" {...settings}>
              {editorsChoice &&
                editorsChoice.map((product, i) => (
                  <Card key={i} product={product} />
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorsChoice;
