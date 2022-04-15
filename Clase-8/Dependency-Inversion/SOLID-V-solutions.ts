// Interfaz para los amigos
interface IFriends{
  name: string
  status: 'online' | 'offline'
}

type IFriendList = IFriends[]

class FriendsCreator {
  list: IFriendList;

  constructor(friendsList: IFriendList) {
    this.list = friendsList;
  }

  setStatus(name: string, status: 'online' | 'offline') {
    const userFind = this.list.find((user) => user.name === name);
    userFind.status = status;
  }
}

class User {
  name: string;
  friends: FriendsCreator;

  // Cortamos la dependecia hacia el modulo inferior
  constructor(name: string, friendsList:FriendsCreator) {
    this.friends = friendsList;
    this.name = name;
  }

  showFriends() {
    console.log(this.friends.list);
  }
}

const friends1 = new FriendsCreator([{ name: 'Alejo', status: 'online' }, { name: 'Alexis', status: 'offline' }]);
const user1 = new User('Tomi', friends1);
