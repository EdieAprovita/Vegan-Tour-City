import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<div>
			<nav className='uk-navbar-container uk-margin' uk-navbar>
				<div className='uk-navbar-left'>
					<Link className='uk-navbar-item uk-logo' to='/'>
						Vegan Vita
					</Link>

					<ul className='uk-navbar-nav'>
						<li>
							<Link href=''>
								<span
									className='uk-icon uk-margin-small-right'
									uk-icon='icon: star'></span>
								Features
							</Link>
						</li>
					</ul>

					<div className='uk-navbar-item'>
						<div>
							Some <a href=''>Link</a>
						</div>
					</div>

					<div className='uk-navbar-item'>
						<form>
							<input
								className='uk-input uk-form-width-small'
								type='text'
								placeholder='Input'
							/>
							<button className='uk-button uk-button-default'>
								Search
							</button>
						</form>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
