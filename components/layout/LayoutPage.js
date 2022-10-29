import Layout, { Content } from "antd/lib/layout/layout"
import FooterPage from "./FooterPage";
import HeaderPage from "./HeaderPage";
const LayoutPage = (props) => {
  return (
    <Layout>
      <HeaderPage />
      <Content>
        {props.children}
      </Content>
      <FooterPage />
    </Layout>
  );
};
export default LayoutPage;