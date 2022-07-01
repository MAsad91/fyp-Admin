import React, { Fragment } from "react";
import Carousel from "react-bootstrap/Carousel";

const ImgCarousel = (props) => {
  console.log(props.image);
  return (
    <Fragment>
      <Carousel>
        {/* <img src={props?.image} alt="items images" /> */}
        {props.image?.map((img) => {
          return (
            <Carousel.Item>
              <img className="d-block w-100" src={img} alt="items images" />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Fragment>
  );
};

export default ImgCarousel;
