import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Carousel, Col, Divider, Flex, Row, Typography} from 'antd';
import {FaCircleChevronLeft, FaCircleChevronRight} from "react-icons/fa6";

const CarDetailNew = () => {
  const {id} = useParams();
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
    void fetchCarDetails();
  }, [id]);

  if (!car) {
    return <p>Loading...</p>;
  }

  const SlickArrowLeft = ({currentSlide, slideCount, ...props}) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" +
        (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
      style={{display: 'flex', alignItems: 'center', width: '30px', color: 'white'}}
    >
      <FaCircleChevronLeft size={40}/>
    </button>
  );
  const SlickArrowRight = ({currentSlide, slideCount, ...props}) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
      style={{display: 'flex', alignItems: 'center', width: '30px', color: 'white'}}
    >
      <FaCircleChevronRight size={40}/>
    </button>
  );

  const settings = {
    nextArrow: <SlickArrowLeft style={{background: "red"}}/>,
    prevArrow: <SlickArrowRight/>,
  }

  const getTextInfo = (title, desc) => {
    return (
      <Row justify="space-between">
        <Col>
          <Typography.Title level={5}>{title}</Typography.Title>
        </Col>
        <Col>
          <span>{desc}</span>
        </Col>
        <Col span={24}>
          <Divider className='m-0' style={{borderLeft: '400px solid white'}}/>
        </Col>
      </Row>
    )
  }


  return (
    <Flex style={{width: '100vw', height: "80vh"}} justify={"center"}>
      <Row justify="space-evenly" style={{
        background: "rgba(255, 255, 255, .5)",
        width: '80vw',
        paddingTop: 'calc(13vh)',
        borderRadius: '10px'
      }}>
        <Col span={8}>
          <Row>
            <Col span={24} style={{textAlign: "center"}}>
              <Typography.Title level={3}>{car.brandType} {car.name}</Typography.Title>
            </Col>
            <Col span={24} style={{textAlign: "center"}}>
              <Carousel arrows {...settings} prevArrow={<SlickArrowLeft/>} nextArrow={<SlickArrowRight/>} autoplay>
                {car?.carImage?.map((image, index) => (
                  <div key={index}>
                    <img width={512} src={`${image.base64Url}`} alt="" style={{borderRadius: '8px'}}/>
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={24} style={{textAlign: "center"}}>
              <Typography.Title level={3}>Дэлгэрэнгүй мэдээлэл</Typography.Title>
            </Col>
            <Col>
              {getTextInfo("Үйлдвэрлэгч", car.countryName)}
              {getTextInfo("Марк", car.name)}
              {getTextInfo("Өнгө", car.color)}
              {getTextInfo("Арлын дугаар", car.motorNumber)}
              {getTextInfo("Хаалга", car.seatNumber)}
              {getTextInfo("Үнэ", car.price)}
              {getTextInfo("Он", car.year + " / " + car.comeYear)}
              {getTextInfo("Гүйлт", car.km + " km")}
              {getTextInfo("Мотор", car.motorPower + " " + car.fuelType)}
            </Col>
          </Row>
        </Col>
      </Row>
    </Flex>
  );
};

export default CarDetailNew;
