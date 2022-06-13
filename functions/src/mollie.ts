import createMollieClient from '@mollie/api-client'
import * as functions from 'firebase-functions'

const apiKey = functions.config().mollie.api_key

export default createMollieClient({ apiKey })
