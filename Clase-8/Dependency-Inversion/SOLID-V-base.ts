interface IFriends{
  name: string
  status: 'online' | 'offline'
}

class FriendsManagement {
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
  friends: FriendsManagement;

  // Modulo superior requiere del inferior
  constructor(name: string, friendsList:IFriendList) {
    this.friends = new FriendsManagement(friendsList);
    this.name = name;
  }

  showFriends() {
    console.log(this.friends.list);
  }
}

const user1 = new User('Tomi', [{ name: 'Alejo', status: 'online' }, { name: 'Alexis', status: 'offline' }]);
