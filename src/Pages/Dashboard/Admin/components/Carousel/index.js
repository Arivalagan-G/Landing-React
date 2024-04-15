import { Carousel } from "antd";
import "./index.css";
function MultiCarousel({ slidesToShow, slides }) {
  return (
    <Carousel autoplay={true} slidesToShow={slidesToShow}>
      {slides.map((value, index) => {
        return (
          <div key={index} className="carousel-card">
            <h2>{value.name}</h2>
            <h3 style={{ fontSize: "15px", color: "white" }}>
              {value.location}
            </h3>
            <h4 className="carousel-card-title">{value.description}</h4>
          </div>
        );
      })}
    </Carousel>
  );
}
export default MultiCarousel;
