import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Market = ({ market }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/markets/${market._id}`}>
				<Card.Img src={market.image} variant='top' />
			</Link>

			<Card.Body>
				<Link to={`/markets/${market._id}`}>
					<Card.Title as='div'>
						<strong>{market.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					<Rating value={market.rating} text={`${market.numReviews} reviews`} />
				</Card.Text>
				<Card.Text as='h3'>${market.price}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Market
