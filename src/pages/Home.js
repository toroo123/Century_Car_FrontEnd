import {useEffect, useState} from "react";
import axios from "axios";
import Car from "../components/Car";
import {useAuth} from "../components/AuthProvider";
import {Card, Col, Row, List, Divider, Tag} from "antd";
import { Link } from 'react-router-dom';
 
function Home() {
  const {user, isLoggedIn} = useAuth()
  console.log(user?.role)
  const [cars, setCars] = useState([]);
  const [favCars, setFavCars] = useState([]);
  const [activeTabKey2, setActiveTabKey2] = useState('likedCars');
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  const tabListNoTitle = [
    {
      label: 'Таалагдсан',
      key: 'likedCars'
    },
    // {
    //   label: 'Санал болгох',
    //   key: 'suggestedCars'
    // },
  ];
  const contentListNoTitle = {
    likedCars:
    <Row gutter={[10, 10]}>
          <Col span={24}>
            <List
              itemLayout="horizontal"
              dataSource={favCars}
              renderItem={(item, index) => (
                <List.Item>
                  <Row gutter={[10, 10]}>
                    <Col span={12}>
                    <img alt="" src={`${item.car.carImage[0]?.base64Url}`} />
                    {item.car?.passed && 
                      <Tag color="success" className='absolute top-2 left-2 text-xs font-medium rounded-lg bg-transparent' bordered={false}>
                          Оношилгоотой
                      </Tag>
                    }
                    </Col>
                    <Col span={12}>
                    <div className="flex-col">
                      <div className="flex flex-nowrap text-lg font-medium whitespace-nowrap">{item.car?.brandType + " "+  item?.car.name + " , " + item?.car.color}</div>
                      <div className="flex justify-start mb-2 text-base">{ 'Үнэ : ' + " " + item?.car.price + '.0 сая'}</div>
                      <div className="flex">
                        {/* <div className=" bg-red-600 px-3 mr-3 rounded-md text-white">{item?.year +"/"+  item?.comeYear}</div> */}
                        <div className="cardYear">
                          <div className="text-white">{item.car?.year}</div>
                          <div className="text-white">{item.car?.comeYear}</div>
                      </div>
                        <p className="flex justify-start">{ item?.car.motorPower + " , " + item.car?.fuelType}</p>
                      </div>
                    </div>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Col>
    </Row>,
    suggestedCars: <p>app content</p>,
  };
 
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/car/getAllCar');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  const getFavData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/car/getAllFavoriteCar');
      setFavCars(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const setFavorite = (event) => {
    console.log('test')
  }
 
  useEffect(() => {
 
    getFavData();
    fetchData();
  }, []);
  return (
    <ul>
      {isLoggedIn &&
          <>
            <Row gutter={[30,0]} style={{  paddingBottom:220, paddingLeft:20, paddingRight:20}} className='bg-black/60'>
              <Col span={18}>
                <div className="">
                  <p className="text-3xl text-red flex justify-start font-medium  pt-3 text-gray-200">Машины зар</p>
                  <Divider style={{ borderLeft: '1px solid red' }} />
                  <Row gutter={[20,20]}>                    
                    {cars?.map((car, index) =>
                        <Col xl={6} lg={6} md={6}>
                          <Link to={`/car/${car.id}`} onClick={(event) => {
                              console.log(event)
                              event.stopPropagation()
                            }}>
                            <Car car={car} index={index} setFavorite={() => {car.favorite = !car.favorite; getFavData()}} />
                          </Link>
                        </Col>
                    )}
                  </Row>
                </div>
              </Col>
              <Col span={6}>
                <Card
                    style={{
                      width: '100%',
                      maxHeight: "calc(100vh - 190px)",
                      overflow: "auto",
                      marginTop:30, 
                      paddingRight:20,
                      background:'#929dad'
                    }}
                    tabList={tabListNoTitle}
                    activeTabKey={activeTabKey2}
                    onTabChange={onTab2Change}
                    tabProps={{
                      size: 'middle',
                    }}
                   
                >
                  <div style={{ height: "100%", overflowY: "auto" }}>
                    {contentListNoTitle[activeTabKey2]}
                  </div>
                </Card>
 
              </Col>
            </Row>
          </>
      }
      {!isLoggedIn &&
          <>
            <div className="title-brand">
              <h1 className="presentation-title">Century Car</h1>
            </div>
            <h2 className="presentation-subtitle text-center">
              Баталгаат машин худалдааны цогц системд тавтай морил!
            </h2>
          </>
 
      }
      {/* ))} */}
    </ul>
  )
}
 
export default Home;