import { Segment } from 'semantic-ui-react'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import Rotas from './Rotas'

function App() {

  return (
    <div className="App">

          <Rotas />

          <ToastContainer />

          <div style={{marginTop: '4%'}}>
            <Segment vertical color='grey' size='tiny' textAlign='center'>
              &copy; 2023 - Projeto WEB 4 - IFPE Jaboatão dos Guararapes
            </Segment>
          </div>

      </div>
  );

}

export default App;
