import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
	return (
		<Container>
			<Navbar bg='light' expand='lg'>
				<Navbar.Brand href='/'>Guia Vegana CDMX</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						<Nav.Link href='/'>Inicio</Nav.Link>
						<Nav.Link href='/restaurantes'>
							<i className='fas fa-utensils'></i>Restaurantes
						</Nav.Link>
						<Nav.Link href='mercados'>
							<i className='fas fa-shopping-cart'></i>Mercados
						</Nav.Link>
						<Nav.Link href='/negocios'>
							<i className='fas fa-cash-register'></i>Negocios
						</Nav.Link>
						<Nav.Link href='recetas'>
							<i className='fas fa-cookie-bite'></i>Recetas
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Container>
	)
}

export default Header
