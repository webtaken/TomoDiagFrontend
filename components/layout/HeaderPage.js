import { Breadcrumb, Layout, Menu, Button } from 'antd';
import Image from 'next/image';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../stores/authContext';

const { Header } = Layout;

const HeaderPage = () => {
  const router = useRouter();
  const { user, login, logout, authReady } = useContext(AuthContext);
  console.log("user: ", user);
  // Llamo a la funcion login en linea 18
  //Solo si tengo user (login) muestro el boton login, si aun no hay registro no  muestro el botón logout
  //linea 16: Solo muestro esa info cuando la conexion entre netlify y user se haya realizado

  const items_not_logged = [
    {
      label: (
        <Button type="link">Logo</Button>
      ),
      key: 'logo'
    },
    {
      label: (
        <Button type="link" onClick={login}>login</Button>
      ),
      key: 'login'
    }
  ];
  const items_logged = [
    {
      label: (
        <Button type="link">Logo</Button>
      ),
      key: 'logo'
    },
    {
      label: (
        <Button type="link" onClick={() => {
          router.push('/diagnosticos')
        }}>TomoDiag</Button>
      ),
      key: 'tomodiag'
    },
    {
      label: (
        <Button type="link" onClick={logout}>Salir</Button>
      ),
      key: 'logout'
    }
  ];

  // if(!user){
  // // si el usuario no está logeado
  //   items = [

  // ];
  // items = items.concat(some_labels);
  // } else {
  //   some_labels = [

  //   ];
  //   items = items.concat(some_labels);
  // }
  // console.log("items: ", items);
  return (
    <Header>
      <Menu
        mode='horizontal'
        theme='dark'
        items={!user ? items_not_logged : items_logged} />
    </Header>
  );
};

export default HeaderPage;