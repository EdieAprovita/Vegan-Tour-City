import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../../components/Rating'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import {
	listBusinessesDetailsAction,
	createBusinessReviewAction,
} from '../../redux/businessesDucks'
import { CREATE_BUSINESS_REVIEW_RESET } from '../../redux/businessesDucks'

const Businesses = ({ history, match }) => {
	return (
		<>
			<h1>Negocios</h1>
		</>
	)
}

export default Businesses
