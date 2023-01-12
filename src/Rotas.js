import React from 'react'

import { Route} from 'react-router-dom'

import Login from './views/Login/FormLogin'
import Home from './views/Home/Home'
import PageCliente from './views/Cliente/PageCliente'
import FormCliente from './views/Cliente/FormCliente'

function Rotas() {
    return (
        <>

            <Route path="/" exact render={() => <Login/>} />
            <Route path="/home" exact render={() => <Home/>} />

            <Route path="/page-cliente" exact render={() => <PageCliente/> }/>
            <Route path="/form-cliente" exact render={() => <FormCliente/> }/>

        </>
    )
}

export default Rotas