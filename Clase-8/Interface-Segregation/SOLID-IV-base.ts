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
  addFriends(friendsList: IFriendList) {
    this.friends = friendsList;
  }
  addPayMethod(creditCard: ICreditCard) {
    this.payments = creditCard;
  }
}

const PS4 = new Consola();

/* que pasaria si quisieramos agregar una consola que necesita la funcion de añadir
 amgios o agregar metodos de pago?
 Por ej:
 const Nintendo64 = new Consola();
 */
