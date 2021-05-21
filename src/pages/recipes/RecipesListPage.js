import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
	listRecipesAction,
	createRecipeAction,
	deleteRecipeAction,
	CREATE_RECIPE_REQUEST,
} from '../../redux/recipesDucks'

const RecipesListPage = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const recipeList = useSelector(state => state.recipesList)
	const { loading, error, recipes, page, pages } = recipeList

	const recipeDelete = useSelector(state => state.recipeDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = recipeDelete

	const recipeCreate = useSelector(state => state.recipeCreate)
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		recipe: createdRecipe,
	} = recipeCreate

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		dispatch({ type: CREATE_RECIPE_REQUEST })

		if (!userInfo) {
			history.push('/login')
		}

		if (!successCreate) {
			history.push(`recipe/${createdRecipe._id}/edit`)
		} else {
			dispatch(listRecipesAction('', pageNumber))
		}
	}, [
		dispatch,
		history,
		userInfo,
		successCreate,
		successDelete,
		createdRecipe,
		pageNumber,
	])

	const deleteHandler = id => {
		if (window.confirm('Estas seguro de lo que haces')) {
			dispatch(deleteRecipeAction(id))
		}
	}

	const createRecipeHandler = () => {
		dispatch(createRecipeAction())
	}
	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Receta</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createRecipeHandler}>
						<i className='fas fa-plus'></i> Crear Receta
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
							{recipes.map(recipe => (
								<tr key={recipe._id}>
									<td>{recipe.name}</td>
									<td>{recipe.address}</td>
									<td>{recipe.contact}</td>
									<td>{recipe.budget}</td>
									<td>{recipe.typeBusiness}</td>
									<td>${recipe.image}</td>

									<td>
										<LinkContainer to={`/recipe/${recipe._id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(recipe._id)}>
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

export default RecipesListPage
