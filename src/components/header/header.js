import React from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, Badge} from 'react-bootstrap';

const Header = ({showGrid, onShowGrid, messageError}) => (
    <Navbar className="mt-2 mb-2 header" bg="light" expand="lg">
        <Navbar.Brand>RIS</Navbar.Brand>
        <Nav className="mr-auto">
            <NavLink className="nav-link" to="/diplom/simple">
                Diploma
            </NavLink>

            <Nav.Link onClick={onShowGrid}>
                {showGrid ? "Don't show grid" : 'Show grid'}
            </Nav.Link>
        </Nav>
        <Badge className="mr-5" pill variant="danger">
            {messageError}
        </Badge>
    </Navbar>
);

export default Header;
