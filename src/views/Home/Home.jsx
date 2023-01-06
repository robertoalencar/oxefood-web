import React from "react";
import MenuSistema from '../Comum/MenuSistema'
import { Container } from 'semantic-ui-react'

class Home extends React.Component{

	render(){
		return(
			<div>

				<MenuSistema />

				<div style={{marginTop: '3%'}}>

					<Container textAlign='justified' >

						<h2>Bem Vindo ao OxeFood !</h2>
						
					</Container>
				</div>
			</div>
		)
	}
}

export default Home;