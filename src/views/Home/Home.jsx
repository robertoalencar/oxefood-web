import React from "react";
import MenuSistema from '../Comum/MenuSistema'
import { Container, Image, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class Home extends React.Component{

	render(){
		return(
			<div>

				<MenuSistema />

				<div style={{marginTop: '5%'}}>

					<Container>
						<Grid columns={2} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    
									<Image src='/logo-IFPE.png' size='large' />

                                </Grid.Column>
                                <Grid.Column>
                                    
									Bem vindo ao sistema <strong>OxeFood</strong> ! <br/>
									Este sistema foi desenvolvido na disciplina de Desenvolvimento para WEB IV. <br/> <br/>

									Para acessar o código da <strong>API</strong> do sistema, acesse: <a href='https://github.com/robertoalencar/oxefood-final' target='_blank'> https://github.com/robertoalencar/oxefood-final </a> <br/> <br/>
									Para acessar o código do <strong>Módulo WEB</strong>, acesse: <a href='https://github.com/robertoalencar/oxefood-web' target='_blank'> https://github.com/robertoalencar/oxefood-web </a>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
					</Container>
				</div>
			</div>
		)
	}
}

export default withRouter(Home);