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

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log("search:", value);
};

const DetailForm = (props) => {
  const router = useRouter();
  const deleteDiagnosticoHandler = () => {
    console.log("Deleting", props.idDiagnostico);
    axios.delete(
      `${BackendConfig.diagnosesEndpoint}/${props.idDiagnostico}`
    ).then((res) => {
      message.success(`El diagnóstico se eliminó con éxito ✅`);
      console.log(`Response:\n ${JSON.stringify(res.data)}`);
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

    axios.put(
      `${BackendConfig.diagnosesEndpoint}/${props.idDiagnostico}`,
      body,
      config
    ).then((res) => {
      message.success(`El diagnóstico se actualizó correctamente ✅`);
      console.log(`Response:\n ${JSON.stringify(res.data)}`);
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
              onChange={onChange}
              onSearch={onSearch}
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
