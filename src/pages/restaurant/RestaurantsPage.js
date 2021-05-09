import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../../components/Rating'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import {
	listRestaurantsDetailsAction,
	createRestaurantReviewAction,
} from '../../redux/restaurantsDucks'
import { CREATE_RESTAURANT_REQUEST } from '../../redux/restaurantsDucks'

const Restaurants = ({ match }) => {
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const dispatch = useDispatch()

	const restaurantDetails = useSelector(state => state.restaurantDetail)
	const { restaurant, loading, error } = restaurantDetails

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const restaurantReviewCreate = useSelector(state => state.restaurantReview)
	const {
		success: successRestaurantReview,
		loading: loadingRestaurantReview,
		error: errorRestaurantReview,
	} = restaurantReviewCreate

	useEffect(() => {
		if (successRestaurantReview) {
			setRating(0)
			setComment('')
		}
		if (!restaurant._id || restaurant._id !== match.params.id) {
			dispatch(listRestaurantsDetailsAction(match.params.id))
			dispatch({ type: CREATE_RESTAURANT_REQUEST })
		}
	}, [dispatch, match, successRestaurantReview, restaurant._id])

	const submitHandler = e => {
		e.preventDefault()
		dispatch(
			createRestaurantReviewAction(match.params.id, {
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
					<Meta title={restaurant.name} />
					<Row>
						<Col md={6}>
							<Image src={restaurant.image} alt={restaurant.name} fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{restaurant.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={restaurant.rating}
										text={`${restaurant.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>
									Descripción: {restaurant.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}></Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reseñas</h2>
							{restaurant.reviews.length === 0 && (
								<Message>Sin Reseñas</Message>
							)}
							<ListGroup variant='flush'>
								{restaurant.reviews.map(review => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Escribe una reseña</h2>
									{successRestaurantReview && (
										<Message variant='success'>
											Reseña creada con Exito
										</Message>
									)}
									{loadingRestaurantReview && <Loader />}
									{errorRestaurantReview && (
										<Message variant='danger'>
											{errorRestaurantReview}
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
												disabled={loadingRestaurantReview}
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

export default Restaurants
