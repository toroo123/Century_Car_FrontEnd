import React, { useState } from 'react';
import { PlusOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Image, Upload, Form, message, Button, Col, Row, Tag, DatePicker, Input} from 'antd';
import axios from 'axios';
import moment from 'moment';
import Moment from 'react-moment';
 
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
 
const CarForm = () => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [carNumber, setCarNumber] = useState('');
  const [startDate,setStartDate] = useState(moment());
  const [checkDate,setCheckDate] = useState(moment());
  const [expireDate,setExpireDate] = useState(moment());
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [passed, setPassed] = useState(null);
  const [color, setColor] = useState("transparent");
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const dateFormat = 'YYYY/MM/DD';
 
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const uploadButton = (
    <button
      style={{border: 0,  background: 'none'}}
      type="button"
    >
      <PlusOutlined style={{color: 'white'}}/>
      <div style={{marginTop: 8, color: 'white'}}>
        Зураг нэмэх
      </div>
    </button>
  );
 
  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Уншиж байна...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Амжилттай хадгаллаа',
        duration: 2,
      });
    }, 1000);
  };
  const openMessage2 = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Автомашиныг хайж байна...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Хайлт амжилттай',
        duration: 2,
      });
    }, 600);
  };
  const openMessage3 = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Автомашиныг хайж байна...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'error',
        content: 'Авто машины дугаар оруулна уу!!!',
        duration: 2,
      });
    }, 600);
  };
 
  const onFinish = async(formValue) => {
    try {
      const formData = new FormData();
      fileList?.forEach((file) => {
        formData.append("fileList", file.originFileObj, file.name);
      });
      formData.append("markName", formValue.markName);
      formData.append("modelName", formValue.modelName);
      formData.append("countryName", formValue.countryName);
      formData.append("buildYear", formValue.buildYear);
      formData.append("importYear", formValue.importYear);
      formData.append("capacity", formValue.capacity);
      formData.append("cabinNumber", formValue.cabinNumber);
      formData.append("manCount", formValue.manCount);
      formData.append("colorName", formValue.colorName);
      formData.append("fuelType", formValue.fuelType);
      formData.append("passed", formValue.passed);
      formData.append("checkDate", formValue.checkDate);
      formData.append("expireDate", formValue.expireDate);
      formData.append("price", formValue.price);
      formData.append("phone", formValue.phone);
      formData.append("km", formValue.km);
      
 
       await axios.post('http://localhost:8081/car/upload', formData)
      .then((result) => {
        openMessage();
        console.log("result",result);
      })
    }catch(error) {
      console.log("err",error);
      console.log(error.response.data.message);
    };
  };
  
  const searchCar = async() => {
    console.log(carNumber)
    let plateNumber = carNumber;
    try {
      await axios.get('http://localhost:8081/car/getCarXypData', {params: {plateNumber}})
        .then((result) => {
          openMessage2();
          setComponentDisabled(false);
          setStartDate(moment(result.data.importDate));
          setCheckDate(moment(result.data.inspectionData.checkDate));
          setExpireDate(moment(result.data.inspectionData.expireDate));
          setPassed(result.data.inspectionData.passed);
          setColor("white");
          form.setFieldsValue({
            markName: result.data.markName,
            modelName: result.data.modelName,
            countryName: result.data.countryName,
            buildYear: result.data.buildYear,
            importYear: moment(result.data.importDate),
            colorName: result.data.colorName,
            capacity: result.data.capacity,
            manCount: result.data.manCount,
            fuelType: result.data.fuelType,
            cabinNumber: result.data.cabinNumber,
            checkDate: moment(result.data.inspectionData.checkDate),
            expireDate: moment(result.data.inspectionData.expireDate),
            passed:result.data.inspectionData.passed,
          });
          console.log("field",form.getFieldsValue());
        })
    }catch(error) {
      openMessage3();
      setComponentDisabled(true);
      console.log(error.response.data.message);
    };

  }
 
  return (
    <div className='flex justify-center'>
      <div className='max-w-2xl h-full p-5 bg-black/60 rounded-xl text-white'>
      <Row gutter={[10, 8]} className='pb-4'>
        <Col span={14}>
          <p className='pb-3 text-yellow-200'>Авто машины улсын дугаарыг оруулж хайна уу.</p>
          <Input onChange={e => setCarNumber(e.target.value)} />
        </Col>
        <Col span={10}>
          <Button type="primary" onClick={searchCar} className='mt-8'>Хайх</Button>
        </Col>
      </Row>
      <Form name="basic" form={form} layout="vertical" onFinish={onFinish} disabled={componentDisabled}>
          <Form.Item label={<label style={{ color: "white" }}>Зураг</label>}>
          {contextHolder}
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          
          <Row gutter={[10, 0]}>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Үйлдвэрлэгч</label>}
                name="markName"
                >
                  <Input/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Загвар</label>}
                name="modelName"
                >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Үйлдвэрлэсэн улс</label>}
                name="countryName"
                >
                <Input/>
              </Form.Item>
            </Col> 
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Үйлдвэрлэсэн он</label>}
                name="buildYear"
                >
                  <Input readOnly={true}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white"}}>Орж ирсэн он/сар</label>}
                name="importYear"
                >
                  <DatePicker  
                    selected={startDate ? moment(startDate, 'DD-MM-YYYY') : null} 
                    dateFormat={dateFormat} 
                    style={{width:'100%', backgroundColor: color}}
                    disabled
                  />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Өнгө</label>}
                name="colorName"
                >
                <Input readOnly={true}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Хөдөлгүүрийн багтаамж</label>}
                name="capacity"
                >
                  <Input readOnly={true}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Суудлын тоо</label>}
                name="manCount"
                >
                  <Input readOnly={true}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Шатахууны төрөл</label>}
                name="fuelType"
                >
                  <Input readOnly={true}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Арлын дугаар</label>}
                name="cabinNumber"
                >
                  <Input readOnly={true}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Гүйлт/км/</label>}
                name="km"
                rules={[{required: true, message: "Заавал бөглөнө үү!"}]}
                >
                  <Input placeholder='Гүйлт/км/ оруулна уу'/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Үнэ /сая.төг/</label>}
                name="price"
                rules={[{required: true, message: "Заавал бөглөнө үү!"}]}
                >
                  <Input placeholder='Үнэ оруулна уу'/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Үзлэгт орсон огноо</label>}
                name="checkDate"
                >
                  <DatePicker 
                    selected={checkDate ? moment(checkDate, 'DD-MM-YYYY') : null} 
                    dateFormat={dateFormat} 
                    disabled
                    style={{width:'100%', backgroundColor: color}}
                  />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Үзлэгт дахин орох огноо</label>}
                name="expireDate"
                >
                  <DatePicker 
                    selected={expireDate ? moment(expireDate, 'DD-MM-YYYY') : null} 
                    dateFormat={dateFormat} 
                    disabled
                    style={{width:'100%', backgroundColor: color}}
                  />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Тэнцсэн эсэх</label>}
                name="passed"
                >
                {passed && 
                  ({passed} ?
                  (<Tag icon={<CheckCircleOutlined />} color="success" className='text-lg font-medium rounded-2xl'>
                    Тэнцсэн
                  </Tag>) :
                  (<Tag icon={<CloseCircleOutlined />} color="error" className='text-lg font-medium rounded-2xl'>
                    Тэнцээгүй
                  </Tag>))
                }
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Утасны дугаар</label>}
                name="phone"
                rules={[{required: true, message: "Заавал бөглөнө үү!"}]}
                >
                <Input placeholder='Утасны дугаар оруулна уу'/>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">Хадгалах</Button>
          </Form.Item>
        </Form>
 
        {previewImage && (
          <Image
            wrapperStyle={{
              display: 'none',
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}
        </div>
      </div>
  );
};
 
export default CarForm;