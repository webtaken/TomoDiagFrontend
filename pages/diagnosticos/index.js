import { useEffect, useState } from "react";
import { Card, Row, Col, Divider, message, Spin, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import LayoutPage from "../../components/layout/LayoutPage";
import AuthContext from "../../stores/authContext";
import { useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const { Meta } = Card;
const { Text } = Typography;

const Diagnosticos = () => {
  const { user, authReady } = useContext(AuthContext);
  const router = useRouter();
  const [lista, setLista] = useState(null);

  // extraemos todos los diagnósticos después de cargar la página
  useEffect(() => {
    if (authReady) {
      if (!user) {
        // si no hay usuario registrado
        router.push("/");
        return;
      }
    }
    let url = `${process.env.NEXT_PUBLIC_DIAGNOSE_ENDPOINT}/`;
    axios
      .get(url)
      .then((res) => {
        setLista(res.data.list);
      })
      .catch((err) => {
        message.error(
          "Ocurrieron algunos errores extrayendo los datos inténtalo más tarde"
        );
      });
  }, [user, authReady]);

  let listaDiagnosticos = (
    <Col span={2} offset={12}>
      <Spin />
    </Col>
  );

  if (Array.isArray(lista)) {
    if (lista.length !== 0) {
      listaDiagnosticos = lista.map((diagnostico, index) => {
        return (
          <Col key={index + 1} xs={12} sm={12} md={12} lg={6} xl={6}>
            <Card
              hoverable
              style={{
                width: 300,
              }}
              cover={
                <img alt="cover diagnóstico" src={`${diagnostico.cover}`} />
              }
              actions={[
                <Link
                  key="diagnostico_link"
                  href={`/diagnosticos/${diagnostico._id}`}
                >
                  <EditOutlined key="edit" /> Ver
                </Link>,
              ]}
            >
              <Meta
                title={`${diagnostico.subject}`}
                description={`Tipo ${diagnostico.typeAnalysis}`}
              />
            </Card>
            <Divider />
          </Col>
        );
      });
    } else {
      listaDiagnosticos = (
        <Col sm={24}>
          <Text strong>Aún no se han agregado diagnósticos</Text>
        </Col>
      );
    }
  }

  return (
    <LayoutPage>
      <Divider />
      <Row gutter={16} justify="space-evenly">
        {user && listaDiagnosticos}
      </Row>
    </LayoutPage>
  );
};

export default Diagnosticos;
