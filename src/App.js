// import third party packages
import {BrowserRouter, Switch, Route} from 'react-router-dom'

// import css
import './App.css'

// import local components
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact to="/sign-in" component={SignIn} />
      <Route exact to="/sign-up" component={SignUp} />
    </Switch>
  </BrowserRouter>
)

export default App
