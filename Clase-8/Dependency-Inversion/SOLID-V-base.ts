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

  // Modulo superior depende del inferior
  constructor(name: string, friendsList:IFriendList) {
    this.friends = new FriendsCreator(friendsList);
    this.name = name;
  }

  showFriends() {
    console.log(this.friends.list);
  }
}

const user1 = new User('Tomi', [{ name: 'Alejo', status: 'online' }, { name: 'Alexis', status: 'offline' }]);
