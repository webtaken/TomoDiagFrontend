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

  let items = [
    {
      label: "Logo",
      key: 'logo'
    }
  ];
  
  const menuItemClickedHandler = (object) => {
    const { key } = object;
    if (key === "login") {
      login();
      router.push("/");
    } else  if (key === "logout") {
      logout();
      router.push("/");
    } else if (key === "logo") {
      router.push("/");
    } else if (key === "tomodiag") {
      router.push("/diagnosticos");
    } else {
      router.push("/");
    }
  };

  if (!user) {
    // si el usuario no está logeado
    items = items.concat([
      {
        label: "Ingresar/Registrarse",
        key: 'login'
      }
    ]);
  } else {
    // si el usuario ya se logeo
    items = items.concat([
      {
        label: "TomoDiag",
        key: 'tomodiag'
      },
      {
        label: "Salir",
        key: 'logout'
      }
    ]);
  }
  return (
    <Header>
      <Menu
        mode='horizontal'
        theme='dark'
        onClick={menuItemClickedHandler}
        items={items} />
    </Header>
  );
};

export default HeaderPage;