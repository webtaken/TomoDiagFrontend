import { useState } from "react";
import { Row, Divider, Col, Card, Image } from "antd";
import { useRouter } from "next/router";
import DetailForm from "../../../components/Diagnosticos/DetailForm";
import LayoutPage from "../../../components/layout/LayoutPage";

// esta es una función auxiliar borrar en la integración
const generateArrTabs = (n) => {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
};

const DetailDiagnostico = () => {
  const [showImages, setShowImages] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('image0');

  const tabList = generateArrTabs(5).map(num => {
    return {
      key: `image${num}`,
      tab: `image${num}`
    };
  })
  const contentList = {};

  const router = useRouter();
  const { idDiagnostico } = router.query;

  const onTabChangeHandler = (key) => {
    setActiveTabKey(key);
  };

  for (const tabItem of tabList) {
    contentList[`${tabItem.key}`] = <div>
      <p>Content {tabItem.tab}</p>
      <Image
        width="100%"
        src="https://i.imgur.com/PDg4AUz.png"
      />
    </div>;
  }

  return (
    <LayoutPage>
      <Divider>Detalle del diagnóstico: {idDiagnostico}</Divider>
      <Row gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }} justify="center" align="middle">
        <Col className="gutter-row"
          xs={24} sm={24} md={12}>
          <Card
            style={{
              width: '100%',
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
        <Col className="gutter-row"
          xs={24} sm={24} md={12}>
          <DetailForm />
        </Col>
      </Row>
    </LayoutPage>
  );
};

export default DetailDiagnostico;