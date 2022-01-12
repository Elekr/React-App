import React from "react";

import { Navbar, Container, Nav, NavDropdown, NavLink } from "react-bootstrap";

const Navigation = () => {
    return(
    <Navbar bg = "primary" variant = "dark" fixed = "top" expand = "lg">
     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Container>
    <Navbar.Brand href="/">Tequila Mockingbird</Navbar.Brand>
        <Nav>
            <NavLink href = "/all/cocktails">Cocktails</NavLink>
            <NavLink href = "/all/equipment">Equipment</NavLink>
            <NavLink href = "/all/ingredients">Ingredients</NavLink>
            <NavLink href = "/all/glasses">Glasses</NavLink>
        </Nav>
    </Container>
    </Navbar>
    )
}

export default Navigation;