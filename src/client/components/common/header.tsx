import * as React from 'react';
import { Link } from 'react-router';
import { Menu, Message } from 'semantic-ui-react';
import './_header.scss';

const Header = () => {
    return (
        <Menu className="main-nav" stackable={true}>
            <Menu.Item name="home" as={Link} to="/" />
            <Menu.Item name="heros" as={Link} to="/heros" />
        </Menu>
    );
};

export default Header;
