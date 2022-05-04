import './App.css'
import BrandComponens from "./components/BrandComponens/index"
import Product from './components/Product';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import TypeComponent from "./components/TypeComponent/index"
import Size from "./components/Size/index"
import User from "./components/User/index"
import  Vouchers from "./components/Vouchers/index"
import Invoices from "./components/Invoices/index"
function App() {

  const token = Cookies.get("cookieLogin")

  return (
    <div className="App">
      <div className="AppGlass">
        <BrowserRouter>

          <Routes>
          <Route path="/login"  exact  element={<Login />} />
            {
              token ? <>  
                <Route path="/brand" exact  element={<BrandComponens />} />
                <Route path="/type" exact element={<TypeComponent />} />
                <Route path="/size" exact element={<Size />} />
                <Route path="/user" exact element={<User />} />
                <Route path="/voucher" exact element={<Vouchers />} />
                <Route path="/invoice" exact element={<Invoices />} />
                <Route path="/product" exact element={<Product />} />
                </> 
                :    <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />}
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;
