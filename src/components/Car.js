import {Carousel} from "antd";
import './component.css';
import {useEffect} from "react";
import { Card } from 'antd';

const { Meta } = Card;
export default function Car(car, index){
    useEffect(() => {
        console.log("Car", car)
    }, []);
  return (
      <div className="">
            <Card
                hoverable
                // style={{ width: 300, overflow: 'hidden'}}
                cover={<img alt="" src={`${car.car?.carImage[0]?.base64Url}`}/>}
                className="card-cover-image"
                bodyStyle={{backgroundColor: '#222732' }}
            >
                <div className="cardTitle">{car.car?.brandType +" "+  car.car?.name + " , " + car.car?.color}</div>
                <div className="cardPrice">{ 'Үнэ : ' + " " + car.car?.price + '.0 сая'}</div>
                <div className="flex">
                    <div className="cardYear">{car.car?.year +"/"+  car.car?.comeYear}</div>
                    <p className="justify-start ">{ car.car?.motorPower + " " + car.car?.type}</p>
                </div>
            </Card>
      </div>
  )
}