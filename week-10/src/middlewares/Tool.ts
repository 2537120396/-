import * as bcrypt from 'bcryptjs'

export async function tools(password:string){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}