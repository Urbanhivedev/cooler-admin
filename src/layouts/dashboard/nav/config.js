// component
import SvgColor from '../../../components/svg-color';
import { BsPeopleFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { GiStoneBlock } from "react-icons/gi";
import {AiFillDashboard} from "react-icons/ai";

import { BiFridge } from "react-icons/bi";

const icon = (name) => <SvgColor src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/home1',
    // icon: icon('ic_msg'),
    icon: <AiFillDashboard/>,
  },
  
  
  {
    title: 'Coolers',
    path: '/dashboard/create-cooler',
    // icon: icon('ic_msg'),
    icon: <GiStoneBlock/>,
  },
 
 
  {
    title: 'Employees',
    path: '/dashboard/home',
    icon: <BsPeopleFill/>,
  },
  {
    title: 'Employers',
    path: '/dashboard/employers',
    icon: <BsFillPersonFill/>,
  },
  

 /* {
    title: 'Settings',
    path: '/dashboard/home2',
    iconLabel: 'settings',
  },*/
];

export default navConfig;
