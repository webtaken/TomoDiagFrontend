import { createContext } from "react";
import netlifyIdentity from "netlify-identity-widget";
import { useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

//linea  para que cuando carguemos pagina no haya sesion iniciada
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    //conexion con netlify
    //accedo a los users con netlify
    netlifyIdentity.on("login", (user) => {
      //le paso mi usuario user
      setUser(user);
      //cierro el modelo del login porque la sesion ha sido iniciada
      //imprimo login event para corroborar
      netlifyIdentity.close();
      console.log("login event");
    });

    //para el logut, escuchamos cuando hagan log out
    //seteamos al user, ahora es uno nuevo
    netlifyIdentity.on("logout", () => {
      setUser(null);
      console.log("logout event");
    });

    //
    netlifyIdentity.on("init", (user) => {
      setUser(user);
      setAuthReady(true);
      console.log("init event");
    });

    // init netlify identity connection
    netlifyIdentity.init();

    // para no tener varios listeners al momento de los eventos
    return () => {
      netlifyIdentity.off("login");

      netlifyIdentity.off("logout");
    };
  }, []);

  //funcion login que abre un modulo para el login
  const login = () => {
    netlifyIdentity.open();
  };

  //funcion logout
  const logout = () => {
    netlifyIdentity.logout();
  };

  //para acceder a las funciones
  const context = { user, login, logout, authReady };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
