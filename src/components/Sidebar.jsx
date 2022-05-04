import React, { useState, useEffect } from "react";
import "./Sidebar.css";
// import '../../src/App.css'
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { useNavigate } from 'react-router-dom';
import { SidebarData } from "../Data/Data";
import Login from "../components/Login/Login"
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

let active=0;
const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const [expanded, setExpaned] = useState(true)


  const onChange = (index)=>{
    switch(index) {
      case 0:
        navigate("/brand");
       // setSelected(index)
        break;
      case 1:
        navigate("/type");
        break;
      case 2:
        navigate("/size");
        break;
      case 3:
        navigate("/product");
        break;
      case 3:
        navigate("/product");
        break;
      case 4:
        navigate("/user");
        break;
      case 5:
        navigate("/blog");
        break;
        case 3:
          navigate("/product");
          break;
          case 4:
            navigate("/user");
            break;
            case 5:
              navigate("/voucher");
              case 6 :
                navigate("/invoice")
              break;
            
      default:
        navigate("/brand");
        break;
    }
  }

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>
         Trang admin
        </span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => onChange(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem">
          <UilSignOutAlt />
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
