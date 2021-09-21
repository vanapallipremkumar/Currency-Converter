// import third party packages
import {BrowserRouter, Switch, Route} from 'react-router-dom'

// import css
import './App.css'

// import local components
import SignIn from './components/SignIn'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact to="/sign-in" component={SignIn} />
    </Switch>
  </BrowserRouter>
)

export default App
