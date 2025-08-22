import {Navigate} from 'react-router-dom'
import Cookie from 'js-cookie'

function ProtectedRoute({component: Component}) {
  const token = Cookie.get('jwt_token')

  if (token === undefined) {
    return <Navigate to="/login" replace />
  }
  return <Component />
}

export default ProtectedRoute
