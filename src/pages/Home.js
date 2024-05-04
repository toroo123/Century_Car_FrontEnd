import {useEffect, useState} from "react";
import axios from "axios";
import Car from "../components/Car";
import {useAuth} from "../components/AuthProvider";

function Home() {
  const {user} = useAuth()
  console.log(user?.role)
  const [cars, setCars] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/car/getAllCar');
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