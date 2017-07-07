import * as React from 'react';
import { Link } from 'react-router';
import { Menu, Message } from 'semantic-ui-react';
import './_header.scss';

const Header = () => (
    <Menu className="main-nav" stackable={true}>
        <Menu.Item><img src={require(`../../../assets/logo.png`)} /></Menu.Item>
        <Menu.Item name="home" as={Link} to="/" />
        <Menu.Item name="heros" as={Link} to="/heros" />
    </Menu>
);

export default Header;
