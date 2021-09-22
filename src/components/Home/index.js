import Cookies from 'js-cookie'

const Home = props => {
  if (Cookies.get('cy_jwt_token') === undefined) {
    const {history} = props
    history.replace('/signin')
  }
  const onclicksignout = () => {
    Cookies.remove('cy_jwt_token')
    const {history} = props
    history.replace('/signin')
  }
  return (
    <button type="button" onClick={onclicksignout}>
      Logout
    </button>
  )
}

export default Home
