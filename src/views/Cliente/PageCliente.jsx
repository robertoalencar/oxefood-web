import React from "react";
import axios from 'axios'
import MenuSistema from '../Comum/MenuSistema'
import { Container, Divider, Table, Button } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'

class PageCliente extends React.Component{

	state = {

        items: [],
        idCliente: ''
	}

	componentDidMount = () => {
		
        axios.get("http://localhost:8081/api/cliente")
        .then((response) => {
            this.setState({
                items: response.data
            })
        })
	}

    novo = () => {
		
        this.props.history.push({
            pathname: '/form-cliente',
            state: { idCliente: '' }
        })
	}

	notify = (mensagem) => toast(mensagem)

	render(){
		return(
			<div>

				<MenuSistema />

				<div style={{marginTop: '3%'}}>

					<Container textAlign='justified' >

						<h2>Listagem Cliente</h2>
						<Divider />

						<div style={{marginTop: '4%'}}>

                            <Button 
                                style={{marginTop: '.5%'}}
                                inverted
                                circular 
                                icon='file outline' 
                                color='orange'
                                title='Cadastrar Novo'
                                onClick={this.novo} 
                                floated='right'>
                                    Novo
                            </Button> <br/><br/><br/>
                        
                            <Table color='orange' sortable celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Nome</Table.HeaderCell>
                                        <Table.HeaderCell>E-mail</Table.HeaderCell>
                                        <Table.HeaderCell>CPF</Table.HeaderCell>
                                        <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                        <Table.HeaderCell>Fone</Table.HeaderCell>
                                        <Table.HeaderCell>Fone Alternativo</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                            
                                <Table.Body>

                                { this.state.items.map(cliente => (

                                    <Table.Row>
                                        <Table.Cell>{cliente.nome}</Table.Cell>
                                        <Table.Cell>{cliente.usuario.username}</Table.Cell>
                                        <Table.Cell>{cliente.cpf}</Table.Cell>
                                        <Table.Cell>{cliente.dataNascimento}</Table.Cell>
                                        <Table.Cell>{cliente.fone}</Table.Cell>
                                        <Table.Cell>{cliente.foneAlternativo}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Button 
                                                inverted
                                                circular 
                                                icon='edit' 
                                                color='blue'
                                                itle='Clique aqui para editar os dados deste cliente'
                                                onClick={e => this.abrirAlterar(cliente.id)} /> &nbsp;
                                            
                                            <Button 
                                                inverted 
                                                circular 
                                                icon='trash' 
                                                color='red' 
                                                title='Clique aqui para remover este cliente'
                                                onClick={e => this.confirmaRemover(cliente.id)} />
                                        </Table.Cell>
                                    </Table.Row>

                                ))}

                                </Table.Body>
                            </Table>
						</div>
					</Container>
				</div>
			</div>
		)
	}
}

export default withRouter(PageCliente);