import {useEffect, useState} from "react";
import axios from "axios";
import Car from "../components/Car";
import {useAuth} from "../components/AuthProvider";
import {Card, Col, Row, Tabs} from "antd";

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
    likedCars: <Row gutter={[10, 10]}>
      {cars?.map((car, index) =>
          <Col span={12}>
            <Car car={car} index={index}/>
          </Col>
      )}
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
      {/* {cars.map((car, index) => ( */}
      {isLoggedIn &&
          <>
            <Row gutter={[30,0]} style={{maxHeight: "calc(100vh - 250px)"}}>
              <Col span={15}>
                <Card title="Зар" style={{maxHeight: "calc(100vh - 190px)", overflow: "auto"}}>
                  <Row gutter={[20,20]}>
                    {cars?.map((car, index) =>
                        <Col span={6}>
                          <Car car={car} index={index}/>
                        </Col>
                    )}
                    {cars?.map((car, index) =>
                        <Col span={6}>
                          <Car car={car} index={index}/>
                        </Col>
                    )}
                    {cars?.map((car, index) =>
                        <Col span={6}>
                          <Car car={car} index={index}/>
                        </Col>
                    )}
                    {cars?.map((car, index) =>
                        <Col span={6}>
                          <Car car={car} index={index}/>
                        </Col>
                    )}
                    {cars?.map((car, index) =>
                        <Col span={6}>
                          <Car car={car} index={index}/>
                        </Col>
                    )}
                    {cars?.map((car, index) =>
                        <Col span={6}>
                          <Car car={car} index={index}/>
                        </Col>
                    )}
                    {cars?.map((car, index) =>
                        <Col span={6}>
                          <Car car={car} index={index}/>
                        </Col>
                    )}
                    {cars?.map((car, index) =>
                        <Col span={6}>
                          <Car car={car} index={index}/>
                        </Col>
                    )}
                    {cars?.map((car, index) =>
                        <Col span={6}>
                          <Car car={car} index={index}/>
                        </Col>
                    )}

                  </Row>
                </Card>
              </Col>
              <Col span={9}>
                <Card
                    style={{
                      width: '100%',
                    }}
                    tabList={tabListNoTitle}
                    activeTabKey={activeTabKey2}
                    onTabChange={onTab2Change}
                    tabProps={{
                      size: 'middle',
                    }}
                >
                  {contentListNoTitle[activeTabKey2]}
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