// component
import SvgColor from '../../../components/svg-color';


const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'users',
    path: '/dashboard/home',
    icon: icon('ic_analytics'),
  },
  
  {
    title: 'coolers',
    path: '/dashboard/create-cooler',
    // icon: icon('ic_msg'),
    iconLabel: 'msg',
  },
  /*{
    title: 'settings',
    path: null,
    iconLabel: 'settings',
  },*/
];

export default navConfig;
