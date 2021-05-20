import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../../components/Rating'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import {
	listDoctorsDetailsAction,
	createDoctorReviewAction,
} from '../../redux/doctorDuck'
import { CREATE_DOCTOR_REQUEST } from '../../redux/doctorDuck'

const DoctorsPage = ({ match }) => {
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const dispatch = useDispatch()

	const doctorDetails = useSelector(state => state.doctorDetail)
	const { doctor, loading, error } = doctorDetails

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const doctorReviewCreate = useSelector(state => state.doctorCreateReview)
	const {
		success: successDoctorReview,
		loading: loadingDoctorReview,
		error: errorDoctorReview,
	} = doctorReviewCreate

	useEffect(() => {
		if (successDoctorReview) {
			setRating(0)
			setComment('')
		}
		if (!doctor._id || doctor._id !== match.params.id) {
			dispatch(listDoctorsDetailsAction(match.params.id))
			dispatch({ type: CREATE_DOCTOR_REQUEST })
		}
	}, [dispatch, match, successDoctorReview, doctor._id])

	const submitHandler = e => {
		e.preventDefault()
		dispatch(
			createDoctorReviewAction(match.params.id, {
				rating,
				comment,
			})
		)
	}
	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Regresar al Inicio
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Meta title={doctor.name} />
					<Row>
						<Col md={6}>
							<Image src={doctor.image} alt={doctor.name} fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{doctor.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={doctor.rating}
										text={`${doctor.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>
									Descripción: {doctor.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}></Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reseñas</h2>
							{doctor.reviews.length === 0 && (
								<Message>Sin Reseñas</Message>
							)}
							<ListGroup variant='flush'>
								{doctor.reviews.map(review => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Escribe una reseña</h2>
									{successDoctorReview && (
										<Message variant='success'>
											Reseña creada con Exito
										</Message>
									)}
									{loadingDoctorReview && <Loader />}
									{errorDoctorReview && (
										<Message variant='danger'>
											{errorDoctorReview}
										</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={e =>
														setRating(e.target.value)
													}>
													<option value=''>
														Seleccionar...
													</option>
													<option value='1'>1 - Malo</option>
													<option value='2'>2 - Regular</option>
													<option value='3'>3 - Bueno</option>
													<option value='4'>
														4 - Muy bueno
													</option>
													<option value='5'>
														5 - Excelente
													</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Label>Comentario</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comment}
													onChange={e =>
														setComment(e.target.value)
													}></Form.Control>
											</Form.Group>
											<Button
												disabled={loadingDoctorReview}
												type='submit'
												variant='primary'>
												Enviar
											</Button>
										</Form>
									) : (
										<Message>
											Por favor <Link to='/login'>Sign In</Link>
											Escribe una Reseña{' '}
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default DoctorsPage
