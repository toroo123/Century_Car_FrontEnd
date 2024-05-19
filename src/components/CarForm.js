import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Form, message, Button, Col, Row, Select, DatePicker, Input} from 'antd';
import carJson from '../json/car.json';
import typeJson from '../json/type.json';
import axios from 'axios';
import contextLogin from '../ContextLogin';
 
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
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [models, setModels] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
 
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
  const makes = [...new Set(carJson.map((item) => item.make))];
  const types = [...new Set(typeJson.map((item) => item.type))];
 
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
 
  const onFinish = async(formValue) => {
    try {
      const formData = new FormData();
      fileList?.forEach((file) => {
        formData.append("fileList", file.originFileObj, file.name);
      });
      formData.append("brandType", formValue.brandType);
      formData.append("name", formValue.name);
      formData.append("type", formValue.type);
      formData.append("carYear", formValue.carYear);
      formData.append("comeYear", formValue.comeYear);
      formData.append("motorPower", formValue.motorPower);
      formData.append("motorNumber", formValue.motorNumber);
      formData.append("seatNumber", formValue.seatNumber);
      formData.append("doorNumber", formValue.doorNumber);
      formData.append("color", formValue.color);
      formData.append("price", formValue.price);
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
 
  const handleMakeChange = (value) => {
    setModels(carJson.filter((item) => item.make === value).map((item) => item.model));
    setSelectedMake(value);
    setSelectedModel('');
  };
 
  const handleModelChange = (value) => {
    setSelectedModel(value);
  };
  const handleTypeChange = (value) => {
    setSelectedType(value);
  };
 
  return (
    <div className='flex justify-center'>
      <div className='max-w-2xl h-full p-5 bg-black/60 rounded-xl text-white'>
      <Form name="basic" form={form} layout="vertical" onFinish={onFinish}>
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
                name="brandType"
                rules={[{required: true, message: "Заавал бөглөнө үү!"}]}
                >
                <Select
                  placeholder="Үйлдвэрлэгчийг сонгоно уу"
                  showSearch
                  onChange={handleMakeChange}
                  value={selectedMake}
                >
                  {makes.map(item => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Марк</label>}
                name="name"
                rules={[{required: true, message: "Заавал бөглөнө үү!"}]}
                >
                <Select
                  placeholder="Марк сонгоно уу"
                  showSearch
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  onChange={handleModelChange}
                  value={selectedModel}
                  disabled={!selectedMake}
                >
                  {models.map(model => (
                    <Select.Option key={model} value={model}>{model}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Төрөл</label>}
                name="type"
                >
                <Select
                  placeholder="Төрөл сонгоно уу"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  onChange={handleTypeChange}
                  value={selectedType}
                >
                  {types.map(item => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Үйлдвэрлэсэн он</label>}
                name="carYear"
                rules={[{required: true, message: "Заавал бөглөнө үү!"}]}
                >
                  <DatePicker picker="month" placeholder='Үйлдвэрлэсэн он' style={{backgroundColor:'white'}}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Орж ирсэн он/сар</label>}
                name="comeYear"
                rules={[{required: true, message: "Заавал бөглөнө үү!"}]}
                >
                  <DatePicker picker="month" placeholder='Орж ирсэн он/сар' style={{backgroundColor:'white'}}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Хөд/багтаамж</label>}
                name="motorPower"
                rules={[{required: true, message: "Заавал бөглөнө үү!"}]}
                >
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Өнгө</label>}
                name="color"
                rules={[{required: true, message: "Заавал бөглөнө үү!"}]}
                >
                  <Input placeholder='Өнгө оруулна уу'/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Суудлын тоо</label>}
                name="seatNumber"
                rules={[{required: true, message: "Заавал бөглөнө үү!"}]}
                >
                  <Input placeholder='Суудлын тоо оруулна уу'/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Хаалганы тоо</label>}
                name="doorNumber"
                rules={[{required: true, message: "Заавал бөглөнө үү!"}]}
                >
                  <Input placeholder='Хаалганы тоо оруулна уу'/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
          <Col span={8}>
              <Form.Item
                label={<label style={{ color: "white" }}>Арлын дугаар</label>}
                name="motorNumber"
                rules={[{required: true, message: "Заавал бөглөнө үү!"}]}
                >
                  <Input placeholder='Арлын дугаар оруулна уу'/>
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