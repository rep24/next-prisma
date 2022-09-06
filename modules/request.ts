import axios from '../node_modules/axios/index'

const requestInstance = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
})

const clientRequestInstance = axios.create({
  baseURL: process.env.CLIENT_BASE_URL,
})

export const getRequestInstance = (isServerSide: boolean) => {
  if (isServerSide) {
    return requestInstance
  }
  return clientRequestInstance
}
