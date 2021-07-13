import { MongoClient, Collection, WithId } from 'mongodb'

import config from './config'
import { IAlbum, IArea,IUser} from './types'

let client: MongoClient
export let areaCollection: Collection<WithId<IArea>>
export let albumCollection: Collection<WithId<IAlbum>>
export let IUserCollection: Collection<WithId<IUser>>

export async function connect() {
  client = await MongoClient.connect(`mongodb://${config.mongo_host}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  let db = client.db(config.mongo_db)
  areaCollection = db.collection('areas')
  albumCollection = db.collection('albums')
  IUserCollection = db.collection('IUser')
}