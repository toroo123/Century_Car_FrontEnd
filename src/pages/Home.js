import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../components/AuthProvider";
import {Card, Col, Divider, List, Row, Space, Tag, Typography} from "antd";
import {Link} from 'react-router-dom';
import {CarNew} from "../components/CarNew";
import Car from "../components/Car";
import {currencyFormat} from "../asset/tools";

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

  const getDtlInfo = (title, desc) => {
    return (
      <Space>
        <b>{title}:</b>
        <span>{desc}</span>
      </Space>
    )
  }
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
                    <img alt="" src={`${item.car.carImage[0]?.base64Url}`} style={{borderRadius: "8px"}}/>
                    {item.car?.passed &&
                      <Tag color="success"
                           className='absolute top-2 left-2 text-xs font-medium rounded-lg bg-transparent'
                           bordered={false}>
                        Оношилгоотой
                      </Tag>
                    }
                  </Col>
                  <Col span={12} style={{textAlign: "start"}}>
                    <Typography.Title level={5}>{item.car?.brandType + " " + item?.car.name}</Typography.Title>
                    {getDtlInfo("Үнэ", currencyFormat(item?.car.price))}
                    {getDtlInfo("Өнгө", item?.car.color)}
                    {getDtlInfo("Он", item.car?.year + " / " + item.car?.comeYear)}
                    {getDtlInfo("Хөдөлгүүр", item?.car.motorPower + "cc")}
                    {getDtlInfo("Төрөл", item?.car.fuelType)}
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

  if (!isLoggedIn)
    return (
      <>
        <div className="title-brand">
          <h1 className="presentation-title">Century Car</h1>
        </div>
        <h2 className="presentation-subtitle text-center">
          Баталгаат машин худалдааны цогц системд тавтай морил!
        </h2>
      </>
    )

  return (
    <Row gutter={[16, 16]}
         style={{paddingBottom: 128, paddingLeft: 20, paddingRight: 20, margin: "0 50px", borderRadius: 10, maxHeight: "calc(80vh)"}}
         className='bg-black/60'>
      <Col span={24}>
        <p className="text-3xl text-red flex justify-start font-medium  pt-3 text-gray-200">Машины зар</p>
      </Col>
      <Col span={18} style={{overflow: "scroll", maxHeight: "calc(69vh)"}}>
        <Row gutter={[20, 20]}>
          {cars?.map((car, index) =>
            <Col xl={6} lg={6} md={6}>
              <Link to={`/car/${car.id}`} onClick={(event) => {
                console.log(event)
                event.stopPropagation()
              }}>
                <CarNew car={car} index={index} setFavorite={() => {
                  car.favorite = !car.favorite;
                  getFavData()
                }}/>
              </Link>
            </Col>
          )}
        </Row>
      </Col>
      <Col span={6}>
        <Card
          style={{
            width: '100%',
            maxHeight: "calc(100vh - 190px)",
            overflow: "auto",
            background: '#929dad',
            position: "sticky"
          }}
          title="Таалагдсан"
          // tabList={tabListNoTitle}
          // activeTabKey={activeTabKey2}
          // onTabChange={onTab2Change}
          tabProps={{
            size: 'middle',
          }}
        >
          <div  style={{overflow: "scroll", height: "calc(58vh)"}}>
            {contentListNoTitle[activeTabKey2]}
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default Home;