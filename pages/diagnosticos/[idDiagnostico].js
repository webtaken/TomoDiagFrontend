import { useEffect, useState, useContext } from "react";
import { Row, Divider, Col, Card, Image, Spin, message } from "antd";
import { useRouter } from "next/router";
import DetailForm from "../../components/Diagnosticos/DetailForm";
import LayoutPage from "../../components/layout/LayoutPage";
import BackendConfig from "../../config/backend";
import axios from "axios";
import AuthContext from "../../stores/authContext";

const DetailDiagnostico = () => {
  const { user } = useContext(AuthContext);
  const [diagnose, setDiagnose] = useState(null);
  const [activeTabKey, setActiveTabKey] = useState("image1");

  // obteniendo el id del diagnóstico por la url
  const router = useRouter();
  const { idDiagnostico } = router.query;

  useEffect(() => {
    if(!user){
      router.push("/");
      return;
    }

    if (idDiagnostico) {
      // obtenemos los datos del diagnóstico una sola vez
      axios
        .get(`${BackendConfig.diagnosesEndpoint}/${idDiagnostico}`)
        .then((res) => {
          console.log(JSON.stringify(res.data));
          setDiagnose(res.data.diagnose); // los datos del diagnóstico
        })
        .catch((err) => {
          message.error("Error al extraer los datos, inténtelo más tarde");
        });
    }
  }, [idDiagnostico, user]);

  const contentList = {};
  let tabList;
  // si obtengo los datos
  if (diagnose) {
    tabList = diagnose.imagesUrls.map((img, index) => {
      return {
        key: `image${index + 1}`,
        tab: `Tomografía ${index + 1}`,
        imgUrl: img,
      };
    });

    for (const tabItem of tabList) {
      contentList[`${tabItem.key}`] = (
        <div>
          <Image width="100%" src={`${tabItem.imgUrl}`} />
        </div>
      );
    }
  }
  const onTabChangeHandler = (key) => {
    setActiveTabKey(key);
  };

  return (
    <LayoutPage>
      {!diagnose && (
        <>
          <Divider>Cargando detalles del diagnóstico</Divider>
          <Row>
            <Col span={2} offset={12}>
              <Spin />
            </Col>
          </Row>
        </>
      )}
      {diagnose && (
        <>
          <Divider>Detalle del diagnóstico</Divider>
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            justify="center"
            type="flex"
          >
            <Col className="gutter-row" xs={24} sm={24} md={12}>
              <Card
                style={{
                  width: "100%",
                }}
                title="Tomografías"
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={(key) => {
                  onTabChangeHandler(key);
                }}
              >
                {contentList[activeTabKey]}
              </Card>
            </Col>
            <Col className="gutter-row" xs={24} sm={24} md={12}>
              <DetailForm
                idDiagnostico={idDiagnostico}
                subject={diagnose.subject}
                description={diagnose.description}
                typeAnalysis={diagnose.typeAnalysis}
              />
            </Col>
          </Row>
        </>
      )}
    </LayoutPage>
  );
};

export default DetailDiagnostico;
