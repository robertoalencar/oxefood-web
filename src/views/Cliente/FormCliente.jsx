import React from "react";
import axios from 'axios'
import MenuSistema from '../Comum/MenuSistema'
import { URL_API } from '../Comum/Constantes'
import { Container, Form, Button, Icon, Divider } from 'semantic-ui-react'
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'

class FormCliente extends React.Component{

	state = {

		idCliente: '',
		email: '',
		password: '',
		nome: '',
		cpf: '',
		fone: '',
		foneAlternativo: '',
		dataNascimento: '',

		ehAlteracao: false
	}

	componentDidMount = () => {

		if (this.props.location.state != null && this.props.location.state.idCliente !== '') {
		
			axios.get(URL_API + "/api/cliente/"+this.props.location.state.idCliente)
      		.then( response => {

        		this.setState({
					ehAlteracao: true,
					idCliente: this.props.location.state.idCliente,
					email: response.data.usuario.username,
					nome: response.data.nome,
					cpf: response.data.cpf,
					fone: response.data.fone,
					foneAlternativo: response.data.foneAlternativo,
					dataNascimento: response.data.dataNascimento
        		})
      		})
		}
	}

	salvar = () => {
		
		if (this.state.ehAlteracao === false) {
			this.cadastrar();
		} else {
			this.alterar();
		}
	}

	cadastrar = () => {

		if (this.state.email !== '' && this.state.password !== '' && this.state.nome !== '') {

			let clienteRequest = {
				email: this.state.email,
				password:  this.state.password,
				nome:  this.state.nome,
				cpf:  this.state.cpf,
				fone:  this.state.fone,
				foneAlternativo:  this.state.foneAlternativo,
				dataNascimento: this.state.dataNascimento
			}
		
			axios.post(URL_API + "/api/cliente", clienteRequest)
			.then((response) => {
				this.notify("Cliente cadastrado com sucesso.")
			})
			.catch((error) => {
				this.notify(error.response.data.message)
			})
		}
	}

	alterar = () => {

		if (this.state.email !== '' && this.state.nome !== '') {

			let clienteRequest = {
				email: this.state.email,
				nome:  this.state.nome,
				cpf:  this.state.cpf,
				fone:  this.state.fone,
				foneAlternativo:  this.state.foneAlternativo,
				dataNascimento: this.state.dataNascimento
			}
		
			axios.put(URL_API + "/api/cliente/" + this.state.idCliente, clienteRequest)
			.then((response) => {
				this.notify("Cliente atualizado com sucesso.")
			})
			.catch((error) => {
				this.notify(error.response.data.message)
			})
		}
	}

	listar = () => {
		this.props.history.push('/page-cliente')
	}

	notify = (mensagem) => toast(mensagem)

	render(){
		return(
			<div>

				<MenuSistema />

				<div style={{marginTop: '3%'}}>

					<Container textAlign='justified' >

						{ this.state.ehAlteracao === false && 
							<h2> <span style={{color: 'darkgray'}}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>
						}
						{ this.state.ehAlteracao === true && 
							<h2> <span style={{color: 'darkgray'}}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração </h2>
						}

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

									{ this.state.ehAlteracao === false && 
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
									}
									{ this.state.ehAlteracao === true && 
										<Form.Input
											disabled
											fluid
											icon='lock'
											iconPosition='left'
											type='password'
											label='Senha'
											value={this.state.password}
											onChange={e => this.setState({password: e.target.value})}
											maxLength="100"
										/>
									}

								</Form.Group>

								<Form.Group widths='equal'>

									<Form.Input
										required
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

								<Form.Input
									fluid
									label='Data Nascimento'
									width={3}
								>
									<InputMask 
										mask="99/99/9999" 
										maskChar={null}
										placeholder="Ex: 20/03/1985"
										value={this.state.dataNascimento} 
										onChange={(e) => {this.setState({dataNascimento: e.target.value})}} 
									/> 
								</Form.Input>

								<Form.Group widths='equal' style={{marginTop: '4%'}}  className='form--empresa-salvar'>

									<Button
										type="button"
										inverted
										circular
										icon
										labelPosition='left'
										color='orange'
										onClick={this.listar}
										>
										<Icon name='reply' />
										Voltar
									</Button>

									<Container textAlign='right'>
										
										<Button
											inverted
											circular
											icon
											labelPosition='left'
											color='blue'
											floated='right'
											onClick={this.salvar}
										>
											<Icon name='save' />
											Salvar
										</Button>
										
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

export default withRouter(FormCliente);