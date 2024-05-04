import {useEffect, useState} from "react";
import axios from "axios";
import Car from "../components/Car";

function Home() {
  const [cars, setCars] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/car/getAllCar');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <ul>
      {cars.map((car, index) => (
        <Car car={car} key={index}/>
      ))}
    </ul>
  )
}

export default Home;