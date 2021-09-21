import Cookies from 'js-cookie'

const Home = props => {
  if (Cookies.get('cy_jwt_token') === undefined) {
    const {history} = props
    history.replace('/signin')
  }
  return <h1>Home</h1>
}

export default Home
