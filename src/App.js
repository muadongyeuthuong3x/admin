import './App.css'
import BrandComponens from "./components/BrandComponens/index"
import Product from './components/Product';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "js-cookie";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
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
