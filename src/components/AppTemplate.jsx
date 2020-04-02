import React from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap';

function AppTemplate({children}) {
    return (
        <React.Fragment>
            <Navbar bg="dark" variant="dark" id="app-header">
                <Navbar.Brand href="#home">COVID-19</Navbar.Brand>
            </Navbar>
            <Container>
                {children}
            </Container>
        </React.Fragment>
    )
}

export default AppTemplate;