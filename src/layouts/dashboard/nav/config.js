// component
import SvgColor from '../../../components/svg-color';


const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/home1',
    // icon: icon('ic_msg'),
    iconLabel: 'msg',
  },
  
  
  {
    title: 'Coolers',
    path: '/dashboard/create-cooler',
    // icon: icon('ic_msg'),
    iconLabel: 'msg',
  },
 
 
  {
    title: 'Employees',
    path: '/dashboard/home',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Employers',
    path: '/dashboard/employers',
    icon: icon('ic_analytics'),
  },
  

  {
    title: 'Settings',
    path: '/dashboard/home2',
    iconLabel: 'settings',
  },
];

export default navConfig;
