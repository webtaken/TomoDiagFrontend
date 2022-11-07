import {
  Form,
  Input,
  Typography,
  Button,
  Row,
  Col,
  List,
  Radio,
  Space
} from "antd";

const { Title } = Typography;

const DetailForm = (props) => {

  return (
    <>
      <Row type="flex" justify="center">
        <Col span={24}>
          <Title level={2}>Detalles del Diagnóstico</Title>
        </Col>
        <Col span={24}>
          <Form
            name="detalle_diagnostico"
            autoComplete="off">
            <Form.Item
              name="subject"
              label="Asunto"
              labelCol={{
                span: 4
              }}
              wrapperCol={{
                span: 16
              }}>
              <Input defaultValue="Tomografía Cervical" />
            </Form.Item>
            <Form.Item
              name="results"
              label="Resultados"
              labelCol={{
                span: 4
              }}
              wrapperCol={{
                span: 16
              }}>
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Space direction="vertical">
                  <Radio.Button value="a">Cuerpos Extraños 30%</Radio.Button>
                  <Radio.Button value="b">Daños en Cervical 20%</Radio.Button>
                  <Radio.Button value="c">Presencia de hernia 40%</Radio.Button>
                  <Radio.Button value="d">Patologías encontradas 10%</Radio.Button>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="description"
              label="Descripción"
              labelCol={{
                span: 4
              }}
              wrapperCol={{
                span: 16
              }}>
              <Input.TextArea showCount maxLength={150} defaultValue="Tomografía cervical de hace años" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Editar Diagnóstico
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default DetailForm;