import { ExpressContext } from 'apollo-server-express'
import { COOKIE_NAME } from '../../../constants'

export function logoutUser({ req, res }: ExpressContext) {
  return new Promise(resolve =>
    req.session.destroy(error => {
      if (error) {
        console.error('There was an issue trying to destroy session', error)
        resolve(false)
      } else {
        res.clearCookie(COOKIE_NAME)
        resolve(true)
      }
    })
  )
}
