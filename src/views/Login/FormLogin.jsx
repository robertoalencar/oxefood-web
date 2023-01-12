import React from 'react'
import { Header, Button, Form, Message, Grid, Segment} from 'semantic-ui-react'
import AuthenticationService from '../Comum/AuthenticationService'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'

class FormLogin extends React.Component {

    state = {

        username: '',
        senha: ''
    }

    componentDidMount = () => {

        if (AuthenticationService.isUserLoggedIn() && !AuthenticationService.isTokenExpired()) {
            this.props.history.push('/home');
        }
    }

    entrar = () => {
        
        if (this.state.username !== '' && this.state.senha !== '') {

            AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.senha)
            .then((response) => {

                AuthenticationService.registerSuccessfulLoginForJwt(response.data.token, response.data.expiration);

                this.props.history.push('/home');

            }).catch((error) => {

                this.notify("Credenciais inválidas")
            })
        }
    }

    notify = (mensagem) => toast(mensagem)

    render() {

        return(

            <div>

                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>

                    <Grid.Column style={{ maxWidth: 500 }}>
                        
                        <Header as='h2' color='grey' textAlign='center'>
                            Informe suas credenciais de acesso
                        </Header>
                        
                        <Form size='large'>
                            <Segment stacked>

                                <Form.Input
                                    fluid
                                    content='{this.state.username}'
                                    onChange={e => this.setState({username: e.target.value})}
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Informe seu e-mail'
                                    required
                                    maxLength="100"
                                />

                                <Form.Input
                                    content='{this.state.senha}'
                                    onChange={e => this.setState({senha: e.target.value})}
                                    icon='lock'
                                    iconPosition='left'
                                    type='password'
                                    placeholder='Senha'
                                    required
                                    maxLength="100"
                                />

                                <Button 
                                    fluid 
                                    size='large'
                                    color='orange' 
                                    icon='sign in alternate' 
                                    content='Entrar' 
                                    onClick={this.entrar} />

                            </Segment>
                        </Form>
                        
                        <Message>
                            Esqueceu a sua senha: <Link to={'/'}>clique aqui</Link>
                        </Message>

                        <div style={{marginTop: '6%'}}>
                            <Segment vertical color='grey' size='tiny' textAlign='center'>
                            &copy; 2023 - Projeto WEB 4 - IFPE Jaboatão dos Guararapes
                            </Segment>
                        </div>

                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default withRouter(FormLogin);