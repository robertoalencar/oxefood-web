import React from "react";
import axios from 'axios'
import MenuSistema from '../Comum/MenuSistema'
import { Container, Divider, Form } from 'semantic-ui-react'
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify'

class FormCliente extends React.Component{

	state = {

		email: '',
		password: '',
		nome: '',
		cpf: '',
		fone: '',
		foneAlternativo: ''
	}

	componentDidMount = () => {
		
	}

	salvar = () => {

		let clienteRequest = {
			chaveEmpresa: '123',
			email: this.state.email,
			password:  this.state.password,
			nome:  this.state.nome,
			cpf:  this.state.cpf,
			fone:  this.state.fone,
			foneAlternativo:  this.state.foneAlternativo
		}
	
		axios.post("http://localhost:8081/api/cliente", clienteRequest)
		.then((response) => {
			this.notify("Cliente cadastrado com sucesso.")
		})
		.catch((error) => {
			this.notify(error.response.data.message)
		})
	}

	notify = (mensagem) => toast(mensagem)

	render(){
		return(
			<div>

				<MenuSistema />

				<div style={{marginTop: '3%'}}>

					<Container textAlign='justified' >

						<h2>Cadastro Cliente</h2>
						<Divider />

						<div style={{marginTop: '4%'}}>

							<Form>

								<Form.Group widths='equal'>

									<Form.Input
										required
										fluid
										icon='mail outline'
										iconPosition='left'
										label='E-mail'
										value={this.state.email}
										onChange={e => this.setState({email: e.target.value})}
										maxLength="100"
									/>

									<Form.Input
										required
										fluid
										icon='lock'
										iconPosition='left'
										type='password'
										label='Senha'
										value={this.state.password}
										onChange={e => this.setState({password: e.target.value})}
										maxLength="100"
									/>

								</Form.Group>

								<Form.Group widths='equal'>

									<Form.Input
										fluid
										label='Nome'
										value={this.state.nome} 
										onChange={e => this.setState({nome: e.target.value})} 
										maxLength="100"
									/>

									<Form.Input
										fluid
										label='CPF'>
										<InputMask 
										mask="999.999.999-99" 
										value={this.state.cpf} 
										onChange={e => this.setState({cpf: e.target.value})} /> 
									</Form.Input>

								</Form.Group>
								
								<Form.Group widths='equal'>

									<Form.Input
										fluid
										label='Fone'>
										<InputMask 
										mask="(99) 9999.9999" 
										value={this.state.fone} 
										onChange={e => this.setState({fone: e.target.value})} /> 
									</Form.Input>

									<Form.Input
										fluid
										label='Fone Alternativo'>
										<InputMask 
										mask="(99) 99999.9999" 
										value={this.state.foneAlternativo} 
										onChange={e => this.setState({foneAlternativo: e.target.value})} /> 
									</Form.Input>

								</Form.Group>


								<Form.Group widths='equal' style={{marginTop: '4%'}}  className='form--empresa-salvar'>

									<Container textAlign='right'>
										<Form.Button 
											circular
											color='orange' 
											icon='save' 
											onClick={this.salvar}
											content='Salvar'
										/>
									</Container>

								</Form.Group>

							</Form>

						</div>
					</Container>
				</div>
			</div>
		)
	}
}

export default FormCliente;