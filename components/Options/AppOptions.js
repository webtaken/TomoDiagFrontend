import { Col, Row, Card, Divider, Button } from 'antd';
import { useRouter } from 'next/router';
const { Meta } = Card;

const AppOptions = () => {
  const router = useRouter();
  const diagnosticosOptHandler = () => {
    router.push('/diagnosticos');
  }
  const nuevoDiagnosticoOptHandler = () => {
    router.push('/diagnosticos/crear');
  }
  return (
    <>
      <Divider>Opciones</Divider>
      <Row justify='space-evenly' gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} sm={4} md={4}>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="diagnosticos" src='https://i.imgur.com/oK6HdMi.png' />}
            actions={[
              <Button type="primary" onClick={diagnosticosOptHandler}>Ver</Button>
            ]}>
            <Meta
              title="Mis diagnósticos"
              style={{
                "textAlign": 'center'
              }} />
          </Card>
        </Col>
        <Col xs={24} sm={4} md={4}>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="nuevo disgnostico" src='https://i.imgur.com/tSRB9Fq.png' />}
            actions={[
              <Button type="primary" onClick={nuevoDiagnosticoOptHandler}>Crear</Button>
            ]}>
            <Meta
              title="Nuevo Diagnóstico"
              style={{
                "textAlign": 'center'
              }} />
          </Card>
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default AppOptions;