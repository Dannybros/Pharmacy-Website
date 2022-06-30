import React from 'react'
import './Sidebar.scss'
import SidebarMenu from './SidebarMenu'
import MenuIcon from '@mui/icons-material/Menu';
import {MenuData} from './MenuData'
import { useSessionStorage } from '../../useSessionStorage';

function Sidebar({setCanvasShow}) {

  const [activeMenu, setActiveMenu]= useSessionStorage("menu", 0);

  return (
    <div className="sidebar">
      <section className='h-100 sidebar_container'>
          <div className='p-3' style={{background:'#18212D'}}> <MenuIcon/> Navigation</div>
          <div className='link_box'>
            {
              MenuData.map((item, i)=>{
                return(
                  <SidebarMenu key={i} number={i} item={item} activeMenu={activeMenu} setActiveMenu={setActiveMenu} setCanvasShow={setCanvasShow}/>
                )
              })
            }
          </div>
      </section>
    </div>
  )
}

export default Sidebar

// import {
//   AppstoreOutlined,
//   ContainerOutlined,
//   MenuFoldOutlined,
//   PieChartOutlined,
// } from '@ant-design/icons';
// import { Button, Menu } from 'antd';
// import { useState } from 'react';

// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }

// const items = [
//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('Option 3', '3', <ContainerOutlined />),
//   getItem('Navigation One', 'sub1', <MailOutlined />, [
//     getItem('Option 5', '5'),
//     getItem('Option 6', '6'),
//     getItem('Option 7', '7'),
//     getItem('Option 8', '8'),
//   ]),
//   getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
//     getItem('Option 9', '9'),
//     getItem('Option 10', '10'),
//     getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
//   ]),
// ];

// const App = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div
//       style={{
//         width: 256,
//       }}
//     >
//       <Button
//         type="primary"
//         onClick={toggleCollapsed}
//         style={{
//           marginBottom: 16,
//         }}
//       >
//         {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//       </Button>
//       <Menu
//         defaultSelectedKeys={['1']}
//         defaultOpenKeys={['sub1']}
//         mode="inline"
//         theme="dark"
//         inlineCollapsed={collapsed}
//         items={items}
//       />
//     </div>
//   );
// };

// export default App;