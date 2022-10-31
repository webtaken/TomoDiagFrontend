import { MedicineBoxOutlined } from '@ant-design/icons';
import { Form, Input, Typography, Select, message, Upload, Button } from 'antd';
const { Option } = Select;
const { Dragger } = Upload;
const { Title } = Typography;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    console.log("info: ", info);
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} se cargó correctamente.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} falló en cargarse.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

const CrearForm = () => {
  return (
    <>
      <Title level={2}>Realizar Diagnóstico</Title>
      <Form
        name='crear_diagnostico'
        autoComplete="off">
        <Form.Item
          label="Título"
          name="title"
          labelCol={{
            span: 24
          }}
          wrapperCol={{
            span: 24
          }}
          tooltip='Título del análisis, p.ej. "Tomografía Cervical"'
          rules={[{
            required: true,
            message: "Porfavor incluye el Título."
          }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Tipo"
          labelCol={{
            span: 24
          }}
          wrapperCol={{
            span: 24
          }}
          name="type_analysis"
          tooltip='Tipo de la tomografía, p.ej. "Cervical"'
          rules={[
            {
              required: true,
              message: 'Porfavor incluye el tipo de tomografía.',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Selecciona el tipo de diagnóstico"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            <Option value="cervical">Cervical</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Tomografías"
          labelCol={{
            span: 24
          }}
          wrapperCol={{
            span: 24
          }}
          name="tomografias"
          valuePropName='tomografias'
          rules={[
            {
              required: true,
              message: 'Porfavor incluye al menos una tomografía.',
            },
          ]}>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <MedicineBoxOutlined />
            </p>
            <p className="ant-upload-text">Sube imágenes de tus radiografías aquí</p>
            <p className="ant-upload-hint">
              Trata de subir la mayor cantidad de imágenes posible para mejorar la precisión del diagnóstico.
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripción"
          tooltip="Descripción del análisis (máx 200 letras)"
          labelCol={{
            span: 24
          }}
          wrapperCol={{
            span: 24
          }}
          rules={[{
            required: true,
            message: 'Porfavor incluye una breve descripción.'
          }]}>
          <Input.TextArea showCount maxLength={150} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Empezar Diagnóstico
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default CrearForm;