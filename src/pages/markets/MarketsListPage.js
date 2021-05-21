import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
	listMarketsAction,
	deleteMarketAction,
	createMarketAction,
	CREATE_MARKET_RESET,
} from '../../redux/marketsDucks'

const MarketsListPage = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const marketList = useSelector(state => state.marketsList)
	const { loading, error, markets, page, pages } = marketList

	const marketDelete = useSelector(state => state.marketsDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = marketDelete

	const marketCreate = useSelector(state => state.marketsCreate)
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		doctor: createdMarket,
	} = marketCreate

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		dispatch({ type: CREATE_MARKET_RESET })

		if (!userInfo) {
			history.push('/login')
		}

		if (successCreate) {
			history.push(`doctor/${createdMarket._id}/edit`)
		} else {
			dispatch(listMarketsAction('', pageNumber))
		}
	}, [
		dispatch,
		history,
		userInfo,
		successCreate,
		successDelete,
		createdMarket,
		pageNumber,
	])

	const deleteHandler = id => {
		if (window.confirm('Estas segurp de lo que haces')) {
			dispatch(deleteMarketAction(id))
		}
	}

	const createMarketHandler = () => {
		dispatch(createMarketAction())
	}
	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Mercados</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createMarketHandler}>
						<i className='fas fa-plus'></i> Crear Mercado
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
								<th>FOTOS</th>

								<th></th>
							</tr>
						</thead>
						<tbody>
							{markets.map(market => (
								<tr key={market._id}>
									<td>{market._id}</td>
									<td>{market.name}</td>
									<td>{market.address}</td>
									<td>{market.contact}</td>
									<td>{market.budget}</td>
									<td>${market.image}</td>

									<td>
										<LinkContainer to={`/doctor/${market._id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(market._id)}>
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

export default MarketsListPage
