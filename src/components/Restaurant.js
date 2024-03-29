import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Restaurant = ({ restaurant }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/restaurants/${restaurant._id}`}>
				<Card.Img src={restaurant.image} variant='top' />
			</Link>

			<Card.Body>
				<Link to={`/restaurants/${restaurant._id}`}>
					<Card.Title as='div'>
						<strong>{restaurant.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					<Rating
						value={restaurant.rating}
						text={`${restaurant.numReviews} reviews`}
					/>
				</Card.Text>
				<Card.Text as='h3'>${restaurant.price}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Restaurant
