import {Button, Card, Divider, Tooltip, Typography} from "antd";
import "./component.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {CheckCircleFilled, CloseCircleFilled, HeartFilled, HeartOutlined} from "@ant-design/icons";
import {currencyFormat} from "../asset/tools";

const {Meta} = Card;
export const CarNew = ({car, index, setFavorite}) => {
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

  const getHeart = () => {
    if (car?.favorite)
      return <HeartFilled/>;
    return <HeartOutlined/>
  }

  const getPassed = () => {
    if (car?.passed === true)
      return <Tooltip title="Оношилгоо тэнцсэн"><CheckCircleFilled style={{color: "green"}}/></Tooltip>;
    return <Tooltip title="Оношилгоонд ороогүй"><CloseCircleFilled style={{color: "red"}}/></Tooltip>;
  }

  return (
    <Card
      className={'cardNew'}
      hoverable
      actions={[
        <Button
          icon={getHeart()}
          type="text"
          onClick={(e) => {
            void handleFavoriteClick();
            e.preventDefault();
          }}
        />]}
      cover={<img alt="" src={`${car?.carImage[0]?.base64Url}`}/>}
    >
      <Divider style={{margin: "2px"}} />
      <Typography.Title level={4}>{car?.brandType} {car?.name} {getPassed()}</Typography.Title>
      <span><b>Үнэ: </b>{currencyFormat(car?.price)}</span><br/>
      <span><b>Өнгө: </b>{car.color}</span><br/>
      <span><b>Он: </b>{car?.year + "/" + car?.comeYear}</span><br/>
      <span><b>Хөдөлгүүр: </b>{car?.motorPower + "cc "}</span><br/>
      <span>{car?.fuelType}</span>
    </Card>
  );
}
