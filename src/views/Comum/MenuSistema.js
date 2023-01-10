import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown } from 'semantic-ui-react'

class MenuSistema extends React.Component {

    state = {

    }

    componentDidMount = () => {
        
    }

    render() {

        return (
            <>
            <Menu pointing secondary color='blue'>

                <Menu.Item 
                    icon={this.state.icon}
                    as={Link} 
                    to='/'
                    content='OxeFood' 
                />

                <Menu.Menu className='navbar__item--pc'>
                    <Dropdown item text='Produto'>
                        <Dropdown.Menu>
                            <Dropdown.Item 
                                icon='tags'
                                text='Categoria' 
                                as={Link} 
                                to=''
                            />
                            <Dropdown.Item 
                                icon="utensils"
                                text='Produto' 
                                as={Link} 
                                to='' 
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>

                <Menu.Item
                    content='Cliente'
                    className='navbar__item--pc'
                    as={Link} 
                    to='/page-cliente'
                />

                <Menu.Menu position='right' className='navbar__item--pc'>

                    <Dropdown 
                        item 
                        text='Sistema'
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item 
                                icon='user' 
                                text='Editar Dados da Empresa' 
                                as={Link}
                                to=''
                            />
                            <Dropdown.Item 
                                icon='settings' 
                                text='Configurações do Sistema' 
                                as={Link}
                                to=''
                            />
                            <Dropdown.Item
                                icon='info'
                                text='Sobre o Sistema'
                                as={Link} 
                                to=''
                            />
                            <Dropdown.Item 
                                onClick={this.logout}
                                icon='power off' 
                                text='Sair' 
                                as={Link} 
                                to=''
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
            
            </>
        )
    }
}

export default MenuSistema