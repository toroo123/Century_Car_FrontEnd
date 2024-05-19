import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card ,Carousel, Button } from 'antd';
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/car/getCar/${id}`);
      setCar(response.data);
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  if (!car) {
    return <p>Loading...</p>;
  }

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" +
        (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
      style={{display:'flex', alignItems:'center', width:'30px', color:'white'}}
    >
      <FaCircleChevronLeft size={40}/>
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
      style={{display:'flex', alignItems:'center', width:'30px', color:'white'}}
    >
      <FaCircleChevronRight size={40}/>
    </button>
  );
  
  const settings = {
    nextArrow: <SlickArrowLeft />,
    prevArrow: <SlickArrowRight />,
}

  return (
    <div style={{ padding: '20px', width: 800 }}>
        <Card title={`${car.brandType} ${car.name}`} bordered={false} style={{ width: 600, backgroundColor: 'gray' }}>
            <Carousel arrows {...settings}  prevArrow={<SlickArrowLeft />} nextArrow={<SlickArrowRight />} infinite={false}>
                {car?.carImage?.map((image, index) => (
                    <div key={index}>
                        <div className="grid justify-center align-top">
                            <img width={600} src={`${image.base64Url}`} alt="" />
                        </div>
                    </div>
                ))}
            </Carousel>
            <div className="carDetails">
                <p>{`Color: ${car.color}`}</p>
                <p>{`Price: ${car.price}.0 million`}</p>
                <p>{`Year: ${car.year}/${car.comeYear}`}</p>
                <p>{`Motor Power: ${car.motorPower} ${car.type}`}</p>
            </div>
        </Card>
    </div>
  );
};

export default CarDetail;
