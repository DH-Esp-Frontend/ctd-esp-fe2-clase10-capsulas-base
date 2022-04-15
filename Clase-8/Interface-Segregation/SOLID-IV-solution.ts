interface ICreditCard{
    numbers: number
    name: string
    expiration_date: number
    segurity_code: number
}

interface IFriends{
    name: string
    status: 'online' | 'offline'
  }

type IFriendList = IFriends[]

class Consola {
  user: string;
  encendido: boolean;
  friends: IFriendList;
  payments: ICreditCard;

  turnOn() {
    this.encendido = true;
  }
  turnOff() {
    this.encendido = false;
  }
}

class Playstation extends Consola {
  addFriends(friendsList: IFriendList) {
    this.friends = friendsList;
  }
  addPayMethod(creditCard: ICreditCard) {
    this.payments = creditCard;
  }
}

class Nintendo extends Consola {}

const PS4 = new Playstation();
const Nintendo64 = new Nintendo();
