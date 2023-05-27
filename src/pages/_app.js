import "react-circular-progressbar/dist/styles.css";
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../public/css/style.css';
import store from '../redux/store';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <ToastContainer autoClose={2000} />
        </Provider>
    )
}

export default MyApp