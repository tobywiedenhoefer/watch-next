import {
    CheckCircleTwoTone,
    EditTwoTone,
    HomeTwoTone,
    CloseCircleTwoTone 
} from '@ant-design/icons';
import { Menu } from 'antd';
import { SetStateAction, useState, useContext, JSX } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../shared/contexts/UserContext';

const LoggedInNavItems = (): JSX.Element => {
  return (
    <Menu.Item key="so" icon={<CloseCircleTwoTone />} style={{ marginLeft: 'auto' }}>
      <Link to="/logout">Log Out</Link>
    </Menu.Item>
  )
}

const LoggedOutNavItems = (): JSX.Element => {
  return (
    <>
      <Menu.Item key="r" icon={<EditTwoTone />} style={{ marginLeft: 'auto' }}>
        <Link to="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="l" icon={<CheckCircleTwoTone />} >
        <Link to="/login">Log In</Link>
      </Menu.Item>
    </>
  )
}


const Header = () => {
    const user = useContext(UserContext);
    const [current, setCurrent] = useState('mail');
    const onClick = (e: { key: SetStateAction<string>; }) => {
        console.log('click', e);
        setCurrent(e.key);
    };
    return (
      <>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="h" icon={<HomeTwoTone />} >
            <Link to="/">Home</Link>
          </Menu.Item>
          {user.uid ? <LoggedInNavItems /> : <LoggedOutNavItems />}
        </Menu>
        <Outlet />
      </>
    )
};

export default Header
