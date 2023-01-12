import React from "react";
import axios from 'axios'
import MenuSistema from '../Comum/MenuSistema'
import { URL_API } from '../Comum/Constantes'
import { Container, Divider, Table, Button, Modal, Header, Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'

class PageCliente extends React.Component{

	state = {

        items: [],
        idCliente: '',

        openModal: false,
        idRemover: ''
	}

	componentDidMount = () => {
		
        this.carregarLista();
	}

    novo = () => {
		
        this.props.history.push({
            pathname: '/form-cliente',
            state: { idCliente: '' }
        })
	}

    abrirAlterar = (id) => {

        this.props.history.push({
            pathname: '/form-cliente',
            state: { idCliente: id}
        })
    };

    confirmaRemover = (id) => {

        this.setState({ 
            openModal: true,
            idRemover: id
        })
    };

    remover = async () => {

        await axios.delete(URL_API + "/api/cliente/" + this.state.idRemover)
    
        .then((response) => {

            this.notify("Cliente excluído com sucesso.")
    
            this.setState({
                openModal: false
            })
    
            this.carregarLista();
    
        })
        .catch((error) => {

            this.notify(error.response.data.message)
    
            this.setState({
                openModal: false
            })
        })
    };

    carregarLista = () => {

      axios.get(URL_API + "/api/cliente")
        .then((response) => {
            this.setState({
                items: response.data
            })
        })

    };

    setOpenModal = (val) => {

        this.setState({ 
            openModal: val
        })
    
    };

    formatarData = (dataHora) => {

        console.log(dataHora)

        let data = new Date(dataHora);
        let dia = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
        let mes = (data.getMonth() + 1) < 10 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1);
        let dataFormatada = dia + "/" + mes + "/" + data.getFullYear(); 
        
        return dataFormatada
    };

	notify = (mensagem) => toast(mensagem)

	render(){
		return(
			<div>

				<MenuSistema />

				<div style={{marginTop: '3%'}}>

					<Container textAlign='justified' >

						<h2>Cliente</h2>
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
                                        <Table.Cell>{this.formatarData(cliente.dataNascimento)}</Table.Cell>
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

                <Modal
                    basic
                    onClose={() => this.setOpenModal(false)}
                    onOpen={() => this.setOpenModal(true)}
                    open={this.state.openModal}
                    >
                    <Header icon>
                        <Icon name='trash' />
                        <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
                    </Header>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={() => this.setOpenModal(false)}>
                            <Icon name='remove' /> Não
                        </Button>
                        <Button color='green' inverted onClick={() => this.remover()}>
                            <Icon name='checkmark' /> Sim
                        </Button>
                    </Modal.Actions>
                </Modal>
                    
			</div>
		)
	}
}

export default withRouter(PageCliente);