import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

function Business({ business }) {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/businesses/${business._id}`}>
				<Card.Img src={business.image} variant='top' />
			</Link>

			<Card.Body>
				<Link to={`/businesses/${business._id}`}>
					<Card.Title as='div'>
						<strong>{business.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					<Rating
						value={business.rating}
						text={`${business.numReviews} reviews`}
					/>
				</Card.Text>
				<Card.Text as='h3'>${business.price}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Business
