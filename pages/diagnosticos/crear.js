import { Row, Col } from 'antd';
import CrearForm from '../../components/Diagnosticos/CrearForm';
import LayoutPage from "../../components/layout/LayoutPage";
import AuthContext from "../../stores/authContext";
import { useContext, useEffect } from "react";
import { useRouter } from 'next/router';

const Crear = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if(!user){
      router.push("/");
      return;
    }
  }, [user]);

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