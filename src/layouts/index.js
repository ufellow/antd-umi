import styles from './index.css';
import User from '../pages/user/index.jsx'
import SubMenu from 'antd/lib/menu/SubMenu';
import { Layout, Menu, Icon, Dropdown, message, Avatar } from 'antd';
import router from 'umi/router'
function BasicLayout(props) {
  console.log(props)
  const { Header, Footer, Sider, Content } = Layout;
  const sideMenuList = [
    {
      title: 'nav 1',
      icon: 'user',
      id: '1'
    },
    {
      title: 'nav 2',
      icon: 'video-camera',
      id: '2'
    },
    {
      title: 'nav 3',
      icon: 'upload',
      id: '3'
    },
    {
      title: 'nav 4',
      icon: 'user',
      id: '4'
    },
    ,
    {
      title: 'nav 5',
      icon: 'user',
      id: '5',
      subMenuList: [
        {
          title: 'nav 5',
          icon: 'user',
          id: '5'
        },
        {
          title: 'nav 5',
          icon: 'user',
          id: '5'
        }, {
          title: 'nav 5',
          icon: 'user',
          id: '5'
        }
      ]
    }
  ]
  const onClick = ({ key }) => {
    // message.info(`Click on item ${key}`);
    if (key == '1') {
      router.push('/user')
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd memu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  )

  return (
    <Layout className={styles.basic_layout}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className={styles.logo} ><img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' /></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          {sideMenuList.map((item, index) => {
            if (!item.hasOwnProperty('subMenuList')) {
              return (
                <Menu.Item key={item.id} >
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </Menu.Item>
              )
            } else {
              return (
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type={item.icon} />
                      <span>{item.title}</span>
                    </span>
                  }
                >
                  <Menu.Item key="5">Option 5</Menu.Item>
                  <Menu.Item key="6">Option 6</Menu.Item>
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
              )
            }

          })}

        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header_container}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className={styles.menu}>
            <Menu.Item key="1" className={styles.sub_menu}>
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2" className={styles.sub_menu}>
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3" className={styles.sub_menu}>
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
          <Dropdown overlay={menu} trigger={['click']}>
            <div className={styles.user_status}>
              {/* <Avatar size={50} icon="user" alt='头像' onClick={(e) => e.preventDefault()} /> */}
              <span>login <Icon type="down" /></span>
            </div>
            {/* <span>login <Icon type="down" />z</span> */}
          </Dropdown>
        </Header>
        <Content>{props.location.pathname == '/user' ? <User /> : null}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
