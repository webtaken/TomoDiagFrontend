import { Breadcrumb, Layout, Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

import Link from 'next/link';

const { Header } = Layout;

const HeaderPage = () => {
  const items = [
    {
      label: (
        <Link href='/'>logo</Link>
      ),
      key: 'logo'
    },
    {
      label: (
        <Link href='/login'>login</Link>
      ),
      key: 'login'
    },
  ];
  return (
    <Header>
      <Menu
        mode='horizontal'
        theme='dark'
        items={items} />
    </Header>
  );
};

export default HeaderPage;