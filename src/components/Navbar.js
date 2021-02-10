import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
	return (
		<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
			<Container>
				<LinkContainer to='/'>
					<Navbar.Brand>Guia Vegana CDMX</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						<LinkContainer to='/'>
							<Nav.Link>Inicio</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/restaurantes'>
							<Nav.Link>
								<i className='fas fa-utensils'></i>Restaurantes
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='mercados'>
							<Nav.Link>
								<i className='fas fa-shopping-cart'></i>Mercados
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/negocios'>
							<Nav.Link>
								<i className='fas fa-cash-register'></i>Negocios
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='recetas'>
							<Nav.Link>
								<i className='fas fa-cookie-bite'></i>Recetas
							</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Header
