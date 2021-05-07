import { Navbar, Nav, Container } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logoutAction } from '../redux/authDucks'

const Header = () => {
	const dispatch = useDispatch()

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const logoutHandler = () => {
		dispatch(logoutAction())
	}
	return (
		<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
			<Container fluid>
				<LinkContainer to='/'>
					<Navbar.Brand className='mr-auto'>Guia Vegana CDMX</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<LinkContainer to='/'>
						<Nav.Link>Inicio</Nav.Link>
					</LinkContainer>
					<Nav className='ml-auto'>
						<LinkContainer to='/restaurantes'>
							<Nav.Link>
								<i className='fas fa-utensils px-2'></i>Restaurantes
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='mercados'>
							<Nav.Link>
								<i className='fas fa-shopping-cart px-2'></i>Mercados
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/negocios'>
							<Nav.Link>
								<i className='fas fa-cash-register px-2'></i>Negocios
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='recetas'>
							<Nav.Link>
								<i className='fas fa-cookie-bite px-2'></i>Recetas
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='doctores'>
							<Nav.Link>
								<i className='fas fa-notes-medical px-2'></i>Doctores
							</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Header
