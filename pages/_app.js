import Navbar from '../components/Navbar'
import { AuthContextProvider } from '../stores/authContext'

import 'antd/dist/antd.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <AuthContextProvider>
    <Component {...pageProps} />
  </AuthContextProvider>
}

export default MyApp
