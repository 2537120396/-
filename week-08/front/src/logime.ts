import { makeAutoObservable } from 'mobx'
import { IUser } from './types'

class loginme {
    user: IUser = null

    setUser(user: IUser) {
        this.user = user
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new loginme()