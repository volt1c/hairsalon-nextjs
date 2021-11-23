import { connect, ConnectOptions } from 'mongoose'

const connection = {
  isConnected: false,
}

export default async function dbConnect() {
  if (connection.isConnected) {
    return
  }

  const uri = process.env.MONGO_URI

  if (typeof uri != 'string')
    return console.error(
      'error - MONGO_URI is undefined or incorrect. Set uri in .env file.'
    )

  const db = await connect(
    process.env.MONGO_URI as string,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions
  )

  if (db.connections[0].readyState == 1) {
    connection.isConnected = true
    console.log('event - mongoDB connected successfully')
  }
}
