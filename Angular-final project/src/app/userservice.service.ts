import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor() { }

  initiateUSer()
  {
    if(localStorage.getItem("Users"))
      return
    localStorage.setItem("Users","[]");
  }
  getUsers():User[]
  {
    if(localStorage.getItem("Users"))
      return JSON.parse(localStorage.getItem("Users")||"[]")
    else
      return []
  }
  addUser(users:User[],user:User)
  {
    users.push(user);
    localStorage.setItem("Users",JSON.stringify(users));
  }
  isExisting(users:User[],email:String)
  {
        return users.find(e=>e.email===email)?true:false;
  }
  findUser(users:User[],email:String)
  {
    return users.find(e=>e.email===email)
  }
  updateLocalstorage(users:User[])
  {
    localStorage.setItem("Users",JSON.stringify(users));
  }
}
