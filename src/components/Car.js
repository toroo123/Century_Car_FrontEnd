import {Carousel} from "antd";
import './component.css';
export default function Car({cars}){
  return (
    
  <Carousel arrows>
      {cars?.map((car, index) => 
        <div key={index} className="contentStyle">
          <div className="grid justify-center align-top">
            <img width={220}
              src={`${car.base64Url}`}
              alt=""/>
            <p>{car.name}</p>
          </div>
        </div>
      )}
  </Carousel>
  )
}