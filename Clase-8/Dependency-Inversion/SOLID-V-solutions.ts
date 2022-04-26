interface IFriends{
  name: string
  status: 'online' | 'offline'
}

//Interfaz a modo de abstraccion 
interface IManagementFriends {
  list: IFriends[],
  setStatus: (name: string, status: 'online' | 'offline')=>void
}

class FriendsManagement implements IManagementFriends {
  list: IFriends[];

  constructor(friendsList: IFriends[]) {
    this.list = friendsList;
  }

  setStatus(name: string, status: 'online' | 'offline') {
    const userFind = this.list.find((user) => user.name === name);
    userFind.status = status;
  }
}

class User {
  name: string;
  friends: IManagementFriends;

  // Modulo refiere a la abstraccion y no al modulo inferior
  constructor(name: string, friendsList: IManagementFriends) {
    this.friends = friendsList;
    this.name = name;
  }

  showFriends() {
    console.log(this.friends.list);
  }
}

const friends1 = new FriendsManagement([{ name: 'Alejo', status: 'online' }, { name: 'Alexis', status: 'offline' }])
const user1 = new User('Tomi', friends1);

