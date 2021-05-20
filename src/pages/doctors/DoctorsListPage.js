import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
	listDoctorsAction,
	deleteDoctorAction,
	createDoctorAction,
	CREATE_DOCTOR_RESET,
} from '../../redux/doctorDuck'

const DoctorListPage = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const doctorList = useSelector(state => state.doctorsList)
	const { loading, error, doctores, page, pages } = doctorList

	const doctorDelete = useSelector(state => state.doctorDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = doctorDelete

	const doctorCreate = useSelector(state => state.doctorCreate)
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		doctor: createdDoctor,
	} = doctorCreate

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		dispatch({ type: CREATE_DOCTOR_RESET })

		if (!userInfo) {
			history.push('/login')
		}

		if (successCreate) {
			history.push(`doctor/${createdDoctor._id}/edit`)
		} else {
			dispatch(listDoctorsAction('', pageNumber))
		}
	}, [
		dispatch,
		history,
		userInfo,
		successCreate,
		successDelete,
		createdDoctor,
		pageNumber,
	])

	const deleteHandler = id => {
		if (window.confirm('Estas seguro de lo que haces')) {
			dispatch(deleteDoctorAction(id))
		}
	}

	const createdoctorHandler = () => {
		dispatch(createDoctorAction())
	}
	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Negocios</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createdoctorHandler}>
						<i className='fas fa-plus'></i> Crear Doctor
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
								<th>ID</th>
								<th>NOMBRE</th>
								<th>DIRECCIÓN</th>
								<th>CONTACTO</th>
								<th>PRESUPUESTO</th>
								<th>TIPO DE NEGOCIO</th>

								<th></th>
							</tr>
						</thead>
						<tbody>
							{doctores.map(doctor => (
								<tr key={doctor._id}>
									<td>{doctor._id}</td>
									<td>{doctor.name}</td>
									<td>{doctor.address}</td>
									<td>{doctor.contact}</td>
									<td>{doctor.budget}</td>
									<td>${doctor.image}</td>

									<td>
										<LinkContainer to={`/doctor/${doctor._id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(doctor._id)}>
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

export default DoctorListPage
