import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavbarSite = () => {
	return (
		<Container fluid>
			<Navbar className='navbar navbar-dark bg-dark' bg='primary' variant='dark' expand='lg'>
				<Navbar.Brand href='#home'>Vegan City Guide</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Nav.Link href='#home'>Home</Nav.Link>
						<Nav.Link href='#link'>Link</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Container>
	)
}

export default NavbarSite
