// import third party packages
import {BrowserRouter, Switch, Route} from 'react-router-dom'

// import css
import './App.css'

// import local components
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  </BrowserRouter>
)

export default App
