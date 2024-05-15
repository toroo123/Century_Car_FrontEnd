import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Form, Input, Button, Col, Row, Select, Option} from 'antd';
import carJson from '../json/car.json';
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
  const [selectedModel, setSelectedModel] = useState('');
  const [models, setModels] = useState([]);

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
      <PlusOutlined />
      <div style={{marginTop: 8}}>
        Upload
      </div>
    </button>
  );

  const makes = [...new Set(carJson.map((item) => item.make))];

  const onFinish = async(formValue) => {
    try {
      const formData = new FormData();
      fileList?.forEach((file) => {
        formData.append("fileList", file.originFileObj, file.name);
      });
      formData.append("brandType", formValue.brandType);
      formData.append("name", formValue.name);

       await axios.post('http://localhost:8081/car/upload', formData)
      .then((result) => {
        console.log("result",result);
      })
    }catch(error) {
      console.log("err",error);
      console.log(error.response.data.message);
    };
  };
  
  const handleMakeChange = (value) => {
    const filteredModels = carJson
      .filter((item) => item.make === value)
      .map((item) => item.model);
    setSelectedMake(value);
    setModels(filteredModels);
    setSelectedModel("");
  };

  const handleModelChange = (value) => {
    setSelectedModel(value);
  };

  return (
    <div className='w-full h-full p-5 bg-slate-600'>
      <Form name="basic" form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Зураг">
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
          <Col span={12}>
            <Form.Item 
              label="Үйлдвэрлэгч"
              name="brandType"
              rules={[{required: true, message: "Заавал бөглөнө үү!"}]}
              >
              <Select
                placeholder="Үйлдвэрлэгчийг сонгоно уу"
                style={{ width: 200 }}
                showSearch
                onChange={handleMakeChange}
                value={carJson.selectedMake}
              >
                {makes.map(item => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="Марк"
              name="name"
              rules={[{required: true, message: "Заавал бөглөнө үү!"}]}
              >
              <Select
                placeholder="Select Model"
                style={{ width: 200 }}
                showSearch
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
  );
};

export default CarForm;
