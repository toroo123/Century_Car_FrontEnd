import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card ,Carousel, Button, Divider } from 'antd';
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
    <div style={{ padding: '20px', width:'100%', display:'flex', justifyContent:'center' }}>
        <Card title={`${car.brandType} ${car.name}`} bordered={false} style={{ width: 600}} className='bg-black/60' headStyle={{ color: '#ffffff' , font:'30px'}}>
            <Carousel arrows {...settings}  prevArrow={<SlickArrowLeft />} nextArrow={<SlickArrowRight />} infinite={false}>
                {car?.carImage?.map((image, index) => (
                    <div key={index}>
                        <div className="grid justify-center align-top">
                            <img width={600} src={`${image.base64Url}`} alt="" />
                        </div>
                    </div>
                ))}
            </Carousel>
            <div className="text-lg text-gray-100 pt-4 inline-grid grid-cols-1 justify-items-start">
                <p>{`Үйлдвэрлэгч : ${car.countryName}`}</p>
                <Divider className='m-0' style={{ borderLeft: '400px solid white' }}/>
                <p>{`Марк : ${car.name}`}</p>
                <Divider className='m-0' style={{ borderLeft: '400px solid white' }}/>
                <p>{`Өнгө : ${car.color}`}</p>
                <Divider className='m-0' style={{ borderLeft: '400px solid white' }}/>
                <p>{`Арлын дугаар : ${car.motorNumber}`}</p>
                <Divider className='m-0' style={{ borderLeft: '400px solid white' }}/>
                <p>{`Хаалга : ${car.seatNumber}`}</p>
                <Divider className='m-0' style={{ borderLeft: '400px solid white' }}/>
                <p>{`Үнэ : ${car.price}.0 сая`}</p>
                <Divider className='m-0' style={{ borderLeft: '400px solid white' }}/>
                <p>{`Он : ${car.year} / ${car.comeYear}`}</p>
                <Divider className='m-0' style={{ borderLeft: '400px solid white' }}/>
                <p>{`Гүйлт : ${car.km} km`}</p>
                <Divider className='m-0' style={{ borderLeft: '400px solid white' }}/>
                <p>{`Гүйлт : ${car.km} km`}</p>
                <Divider className='m-0' style={{ borderLeft: '400px solid white' }}/>
                <p>{`Мотор : ${car.motorPower} ${car.fuelType}`}</p>
            </div>
        </Card>
    </div>
  );
};

export default CarDetail;
