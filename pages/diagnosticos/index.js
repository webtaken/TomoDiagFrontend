import { Card, Row, Col, Divider } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import LayoutPage from "../../components/layout/LayoutPage";
import Link from 'next/link';

const { Meta } = Card;

const Diagnosticos = () => {
  const listaDiagnosticos = new Array(7).fill(0).map((diagnostico, index) => {
    return <Col key={index + 1}
      xs={12} sm={12} md={12} lg={6} xl={6}>
      <Card
        hoverable
        style={{
          width: 300,
        }}
        cover={
          <img
            alt="example"
            src="https://i.imgur.com/PDg4AUz.png"
          />
        }
        actions={[
          <Link href={`/diagnosticos/detalle/${index}`}><EditOutlined key="edit" /> Ver</Link>,
        ]}
      >
        <Meta
          title="Título Tomografía"
          description="Descripción tomografía"
        />
      </Card>
      <Divider />
    </Col>;
  });

  return (
    <LayoutPage>
      <Divider />
      <Row gutter={16} justify='space-evenly'>
        {listaDiagnosticos}
      </Row>
    </LayoutPage>
  );
};

export default Diagnosticos;