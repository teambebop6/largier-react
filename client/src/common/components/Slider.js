import React, { Component } from 'react';
import Slider from 'react-slick';

import './../../../node_modules/slick-carousel/slick/slick.css';
import './../../../node_modules/slick-carousel/slick/slick-theme.css';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      role="presentation"
      className={className}
      style={{ ...style, display: 'block', right: '5%' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      role="presentation"
      className={className}
      style={{ ...style, display: 'block', left: '5%' }}
      onClick={onClick}
    />
  );
}

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      lazyLoad: true,
      className: 'center',
      centerMode: true,
      focusOnSelect: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 2,
      slidesToScroll: 1,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 10000,
      pauseOnHover: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            swipeToSlide: true,
          },
        },
      ],
    };
    return (
      <Slider {...settings}>
        <div>
          <div className="videoWrapper">
            <iframe
              title="Video 1"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/1VgdOcGl-q8"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen=""
            />
          </div>
        </div>
        <div>
          <div className="videoWrapper">
            <iframe
              title="Video 2"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/oqXjA0Uh38c"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen=""
            />
          </div>
        </div>
        <div>
          <div className="videoWrapper">
            <iframe
              title="Video 3"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/cnhkhJmc__I"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen=""
            />
          </div>
        </div>
      </Slider>
    );
  }
}
