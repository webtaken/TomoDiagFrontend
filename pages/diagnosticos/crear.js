import { Row, Col } from 'antd';
import CrearForm from '../../components/Diagnosticos/CrearForm';
import LayoutPage from "../../components/layout/LayoutPage";

const Crear = () => {
  return (
    <LayoutPage>
      <Row type="flex" justify="center" align="middle"
        style={{ minHeight: '75vh' }}>
        <Col span={10}>
          <CrearForm />
        </Col>
      </Row>
    </LayoutPage>
  );
}

export default Crear;