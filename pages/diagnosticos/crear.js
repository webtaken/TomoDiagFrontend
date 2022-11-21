import { Row, Col } from "antd";
import CrearForm from "../../components/Diagnosticos/CrearForm";
import LayoutPage from "../../components/layout/LayoutPage";
import AuthContext from "../../stores/authContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const Crear = () => {
  const { user, authReady } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authReady) {
      if (!user) {
        // si no hay usuario registrado
        router.push("/");
        return;
      }
    }
  }, [user, authReady]);

  return (
    <LayoutPage>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "75vh" }}
      >
        {user && (
          <Col span={10}>
            <CrearForm />
          </Col>
        )}
      </Row>
    </LayoutPage>
  );
};

export default Crear;
