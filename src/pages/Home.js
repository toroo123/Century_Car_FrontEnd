import {useEffect, useState} from "react";
import axios from "axios";
import Car from "../components/Car";
import {useAuth} from "../components/AuthProvider";
import {Card, Col, Row, List, Divider} from "antd";
import { Link } from 'react-router-dom';

function Home() {
  const {user, isLoggedIn} = useAuth()
  console.log(user?.role)
  const [cars, setCars] = useState([])
  const [activeTabKey2, setActiveTabKey2] = useState('likedCars');
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  const tabListNoTitle = [
    {
      label: 'Таалагдсан',
      key: 'likedCars'
    },
    {
      label: 'Санал болгох',
      key: 'suggestedCars'
    },
  ];
  const contentListNoTitle = {
    likedCars: 
    <Row gutter={[10, 10]}>
          <Col span={24}>
            <List
              itemLayout="horizontal"
              dataSource={cars}
              renderItem={(item, index) => (
                <List.Item>
                  <Row gutter={[10, 10]}>
                    <Col span={10}>
                    <img alt="" src={`${item.carImage[0]?.base64Url}`} />
                    
                    </Col>
                    <Col span={14}>
                    <div className="flex-col">
                      <div className="flex flex-nowrap text-lg font-medium whitespace-nowrap">{item?.brandType + " "+  item?.name + " , " + item?.color}</div>
                      <div className="flex justify-start mb-2 text-base">{ 'Үнэ : ' + " " + item?.price + '.0 сая'}</div>
                      <div className="flex">
                        <div className=" bg-red-600 px-3 mr-3 rounded-md text-white">{item?.year +"/"+  item?.comeYear}</div>
                        <p className="flex justify-start">{ item?.motorPower + " , " + item?.type}</p>
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
      {isLoggedIn &&
          <>
            <Row gutter={[30,0]} style={{ backgroundColor:'white'}}>
              <Col span={18}>
                <Card title="Зар" style={{}}>
                  <Row gutter={[20,20]}>                    
                    {cars?.map((car, index) =>
                        <Col xl={6} lg={6} md={6}>
                          <Link to={`/car/${car.id}`}>
                            {console.log("dd",`${car.id}`)}
                            <Car car={car} index={index} />
                          </Link>
                        </Col>
                    )}
                  </Row>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                    style={{
                      width: '100%',
                      maxHeight: "calc(100vh - 190px)",
                      overflow: "auto"
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