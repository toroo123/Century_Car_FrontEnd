import {Carousel} from "antd";
import './component.css';
import {useEffect} from "react";
export default function Car(car, index){
    useEffect(() => {
        console.log("Car==========", car)
    }, []);
  return (
      <div className="carProf">
          <img width={260}
               src={`${car.car.base64Url}`}
               alt=""/>
          <p>{car.car.name}</p>
      </div>
  )
}