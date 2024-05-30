import {Button, Card, Tag} from "antd";
import "./component.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {MdFavorite, MdFavoriteBorder} from "react-icons/md";

const {Meta} = Card;
export default function Car({car, index, setFavorite}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async () => {
    console.log(car);
    setIsFavorite(!isFavorite);
    const carId = car?.id;
    console.log("carId", {carId});
    try {
      await axios
        .get("http://localhost:8081/car/favorite", {params: {carId}})
        .then((result) => {
          setFavorite(result);
          console.log("result", result);
        });
    } catch (error) {
      console.log("err", error);
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    console.log("Car", car);
  }, []);
  return (
    <Card
      hoverable
      cover={<img alt="" src={`${car?.carImage[0]?.base64Url}`}/>}
      className="card-cover-image static "
    >
      {car?.passed &&
        <Tag color="success" className='absolute top-2 left-2 text-sm font-medium rounded-lg bg-transparent'
             bordered={false}>
          Оношилгоотой
        </Tag>
      }
      <Button
        onClick={(e) => {
          handleFavoriteClick();
          e.preventDefault();
        }}
      >
        {car?.favorite ? (
          <MdFavorite size={20}/>
        ) : (
          <MdFavoriteBorder size={20}/>
        )}
      </Button>
      <div className="cardTitle">
        {car?.brandType + " " + car?.name + " , " + car?.color}
      </div>
      <div className="cardPrice">
        {"Үнэ : " + " " + car?.price + ".0 сая"}
      </div>
      <div className="flex">
        <div className="cardYear">
          {car?.year + "/" + car?.comeYear}
        </div>
        <p className="justify-start ">
          {car?.motorPower + " " + car?.fuelType}
        </p>
      </div>
    </Card>
  );
}
