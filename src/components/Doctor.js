import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Doctor = ({ doctor }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/doctors/${doctor._id}`}>
				<Card.Img src={doctor.image} variant='top' />
			</Link>

			<Card.Body>
				<Link to={`/doctors/${doctor._id}`}>
					<Card.Title as='div'>
						<strong>{doctor.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					<Rating value={doctor.rating} text={`${doctor.numReviews} reviews`} />
				</Card.Text>
				<Card.Text as='h3'>${doctor.price}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Doctor
