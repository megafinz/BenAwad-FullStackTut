import config from './lib/config'

export const __prod__ = config.node.env === 'production'
export const COOKIE_NAME = 'connect.sid'
export const FORGOT_PASSWORD_PREFIX = 'forgot-password:'
