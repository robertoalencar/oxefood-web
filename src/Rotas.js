import React from 'react'

import { BrowserRouter, Routes, Route} from 'react-router-dom'

import FormCliente from './views/Cliente/FormCliente'

function Rotas() {
    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<FormCliente />} />

            </Routes>

        </BrowserRouter>

    )
}

export default Rotas