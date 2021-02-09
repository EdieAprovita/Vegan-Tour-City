import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
	return (
		<Container>
			<Navbar bg='light' expand='lg'>
				<Navbar.Brand href='#home'>Guia Vegana CDMX</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						<Nav.Link href='/'>Inicio</Nav.Link>
						<Nav.Link href='/restaurantes'>Restaurantes</Nav.Link>
						<Nav.Link href='mercados'>Mercados</Nav.Link>
						<Nav.Link href='/negocios'>Negocios</Nav.Link>
						<Nav.Link href='recetas'>Recetas</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Container>
	)
}

export default Header
