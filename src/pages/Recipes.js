import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { listRecipes } from '../redux/recipesDucks'

const Recipes = () => {
	const dispatch = useDispatch()

	const recipes = useSelector(store => store.recipes.recipeArr)
	console.log(recipes)
	return (
		<div>
			<h1>Lista de Recetas</h1>
			<button onClick={() => dispatch(listRecipes())}>Obtener Recetas</button>
			<ul>
				{recipes.map(item => (
					<li key={item.title}>{item.title}</li>
				))}
			</ul>
		</div>
	)
}

export default Recipes
