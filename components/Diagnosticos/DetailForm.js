import {
  Form,
  Input,
  Typography,
  Button,
  Row,
  Col,
  Select,
  Radio,
  Space,
  message
} from "antd";
import axios from "axios";
import { useRouter } from 'next/router';
import BackendConfig from "../../config/backend";

const { Title } = Typography;
const { Option } = Select;

const DetailForm = (props) => {
  const router = useRouter();
  const deleteDiagnosticoHandler = () => {
    let url=`${process.env.NEXT_PUBLIC_DIAGNOSE_ENDPOINT}/${props.idDiagnostico}`;
    axios.delete(url)
    .then((res) => {
      message.success(`El diagnóstico se eliminó con éxito ✅`);
      router.push("/diagnosticos");
    }).catch((err) => {
      message.error(`Ocurrió un error inténtelo más tarde: ${err}`);
    });
  };
  
  const updateDiagnosticoHandler = (valuesForm) => {
    const { subject, description, typeAnalysis } = valuesForm;
    
    const body = {
      subject: subject,
      description: description,
      typeAnalysis: typeAnalysis,
    };

    const config = {
      headers: { "Content-Type": "application/json" }
    };

    let url=`${process.env.NEXT_PUBLIC_DIAGNOSE_ENDPOINT}/${props.idDiagnostico}`;
    axios.put(
      url,
      body,
      config
    ).then((res) => {
      message.success(`El diagnóstico se actualizó correctamente ✅`);
    }).catch((err) => {
      message.error(`Ocurrió un error inténtelo más tarde: ${err}`);
    });
  };

  return (
    <Row type="flex" justify="center">
      <Col span={24}>
        <Title level={2}>Detalles del Diagnóstico</Title>
      </Col>
      <Col span={24}>
        <Form
          name="detalle_diagnostico"
          autoComplete="off"
          onFinish={updateDiagnosticoHandler}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            subject: props.subject,
            typeAnalysis: props.typeAnalysis,
            description: props.description
          }}
        >
          <Form.Item name="subject" label="Asunto">
            <Input />
          </Form.Item>
          <Form.Item name="typeAnalysis" label="Tipo" >
            <Select
              showSearch
              optionFilterProp="children"
              value={props.typeAnalysis}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="cervical">Cervical</Option>
            </Select>
          </Form.Item>
          <Form.Item name="results" label="Resultados">
            <Radio.Group value="a" buttonStyle="solid">
              <Space direction="vertical">
                <Radio.Button value="a">Cuerpos Extraños 30%</Radio.Button>
                <Radio.Button value="b">Daños en Cervical 20%</Radio.Button>
                <Radio.Button value="c">Presencia de hernia 40%</Radio.Button>
                <Radio.Button value="d">
                  Patologías encontradas 10%
                </Radio.Button>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="description" label="Descripción">
            <Input.TextArea
              showCount
              maxLength={150}
            />
          </Form.Item>
          <Form.Item
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          >
            <Button type="primary" htmlType="submit">
              Actualizar Diagnóstico
            </Button>
            <Button danger htmlType="button" onClick={deleteDiagnosticoHandler}>
              Eliminar Diagnóstico
            </Button>
          </Form.Item>

        </Form>
      </Col>
    </Row>
  );
};

export default DetailForm;
