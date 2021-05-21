import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
	listBusinessesAction,
	createBusinessAction,
	deleteBusinessAction,
	CREATE_BUSINESS_RESET,
} from '../../redux/businessesDucks'

const BusinessesListPage = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const businessList = useSelector(state => state.businessesList)
	const { loading, error, businesses, page, pages } = businessList

	const businessDelete = useSelector(state => state.businessDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = businessDelete

	const businessCreate = useSelector(state => state.businessCreate)
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		business: createdBusiness,
	} = businessCreate

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		dispatch({ type: CREATE_BUSINESS_RESET })

		if (!userInfo) {
			history.push('/login')
		}

		if (successCreate) {
			history.push(`business/${createdBusiness._id}/edit`)
		} else {
			dispatch(listBusinessesAction('', pageNumber))
		}
	}, [
		dispatch,
		history,
		userInfo,
		successCreate,
		successDelete,
		createdBusiness,
		pageNumber,
	])

	const deleteHandler = id => {
		if (window.confirm('Estas seguro de lo que haces')) {
			dispatch(deleteBusinessAction(id))
		}
	}

	const createBusinessHandler = () => {
		dispatch(createBusinessAction())
	}
	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Negocios</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createBusinessHandler}>
						<i className='fas fa-plus'></i> Crear Negocio
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>NOMBRE</th>
								<th>DIRECCIÓN</th>
								<th>CONTACTO</th>
								<th>PRESUPUESTO</th>
								<th>TIPO DE NEGOCIO</th>

								<th></th>
							</tr>
						</thead>
						<tbody>
							{businesses.map(business => (
								<tr key={business._id}>
									<td>{business.name}</td>
									<td>{business.address}</td>
									<td>{business.contact}</td>
									<td>{business.budget}</td>
									<td>{business.typeBusiness}</td>
									<td>${business.image}</td>

									<td>
										<LinkContainer
											to={`/business/${business._id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(business._id)}>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate pages={pages} page={page} />
				</>
			)}
		</>
	)
}

export default BusinessesListPage
