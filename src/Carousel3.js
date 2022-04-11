import React from "react";
import Carousel from "react-multi-carousel";
import "./Carousel3.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

class Carousel3 extends React.Component {
  state = { additionalTransfrom: 0 };
  render() {
    // console.log(this.props.filteredData);
    const CustomSlider = ({ carouselState }) => {
      let value = 0;
      let carouselItemWidth = 0;
      if (this.Carousel) {
        carouselItemWidth = this.Carousel.state.itemWidth;
        const maxTranslateX = Math.round(
          // so that we don't over-slide
          carouselItemWidth *
            (this.Carousel.state.totalItems -
              this.Carousel.state.slidesToShow) +
            150
        );
        value = maxTranslateX / 100; // calculate the unit of transform for the slider
      }
      const { transform } = carouselState;
      return (
        <div className="custom-slider">
          <input
            type="range"
            value={Math.round(Math.abs(transform) / value)}
            defaultValue={0}
            max={
              (carouselItemWidth *
                (carouselState.totalItems - carouselState.slidesToShow) +
                (this.state.additionalTransfrom === 150 ? 0 : 150)) /
              value
            }
            onChange={(e) => {
              if (this.Carousel.isAnimationAllowed) {
                this.Carousel.isAnimationAllowed = false;
              }
              const nextTransform = e.target.value * value;
              const nextSlide = Math.round(nextTransform / carouselItemWidth);
              if (
                e.target.value == 0 &&
                this.state.additionalTransfrom === 150
              ) {
                this.Carousel.isAnimationAllowed = true;
                this.setState({ additionalTransfrom: 0 });
              }
              this.Carousel.setState({
                transform: -nextTransform, // padding 20px and 5 items.
                currentSlide: nextSlide,
              });
            }}
            className="custom-slider__input"
          />
        </div>
      );
    };
    return (
      <Carousel
        ssr={false}
        autoPlay={false}
        shouldResetAutoplay={false}
        ref={(el) => (this.Carousel = el)}
        partialVisbile={false}
        focusOnSelect={true}
        customButtonGroup={<CustomSlider />}
        itemClass="slider-image-item"
        responsive={responsive}
        containerClass="carousel-container-with-scrollbar"
        additionalTransfrom={-this.state.additionalTransfrom}
        beforeChange={(nextSlide) => {
          this.setState({ isMoving: true });
          if (nextSlide !== 0 && this.state.additionalTransfrom !== 150) {
            this.setState({ additionalTransfrom: 150 });
          }
          if (nextSlide === 0 && this.state.additionalTransfrom === 150) {
            this.setState({ additionalTransfrom: 0 });
          }
        }}
        afterChange={() => this.setState({ isMoving: false })}
      >
        {this.props.filteredData.map((value, index) => {
          return (
            <div className="increase-size" key={value.id}>
              <div className="image-container-text">
                <p>{value.business_name}</p>
              </div>
              <img
                src={value.biz_thumbnail}
                alt={value.business_name}
                draggable={false}
                style={{ width: "100%", cursor: "pointer" }}
                onClick={(e) => {
                  if (!this.state.isMoving) {
                    console.log("clicked 2");
                    this.props.classSelectBusiness(value);
                  }
                }}
              />
            </div>
          );
        })}

        {/* <div class="increase-size">
          <div class="image-container-text">
            <p>2</p>
          </div>
          <img
            alt="1"
            draggable={false}
            style={{ width: "100%", cursor: "pointer" }}
            src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            onClick={(e) => {
              if (!this.state.isMoving) {
                console.log("clicked 2");
                this.props.classSelectBusiness("chose a business");
              }
            }}
          />
        </div> */}
      </Carousel>
    );
  }
}

export default Carousel3;
