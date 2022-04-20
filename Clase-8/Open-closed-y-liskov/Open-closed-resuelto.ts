import FakeApi from './fakeApi';

interface IUsuario {
    nombre: string;
    apellido: string;
    email: string;
}

// NOTA: Se puede correr el proyecto con el comando yarn run-resuelto.

// Para cumplir con los principios de abierto y cerrado así como el de liskov,
// Creamos una clase Usuario que contenga los métodos que serán comunes
// a todos los usuarios. En este caso, cualquier usuario podrá loguearse y cambiar su contraseña.

class Usuario {
    nombre: IUsuario['nombre'];
    apellido: IUsuario['apellido'];
    email: IUsuario['email'];
    API: FakeApi;

    constructor(
        nombre: IUsuario['nombre'],
        apellido: IUsuario['apellido'],
        email: IUsuario['email'],
    ) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.API = new FakeApi();
    }

    async login(contrasena: string) {
        try {
            const usuario = await this.API.login(this.email, contrasena);
            console.log(`Bienvenido ${usuario.nombre} ${usuario.apellido}`);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    async cambiarContrasena(contrasena: string, nuevaContrasena: string) {
        try {
            await this.API.cambiarContrasena(
                this.email,
                contrasena,
                nuevaContrasena,
            );
            console.log(`Contraseña cambiada con éxito`);
        } catch (error: any) {
            console.log(error.message);
        }
    }
}

// Creamos una clase Administrador que hereda de Usuario y tiene métodos específicos para los administradores.
// En este caso, el administrador podrá cambiar el email de cualquier usuario.

class UsuarioAdministrador extends Usuario {
    async cambiarEmail(email: string, nuevoEmail: string) {
        try {
            await this.API.cambiarEmail(email, nuevoEmail);
            console.log(`Email cambiado con éxito`);
        } catch (error: any) {
            console.log(error.message);
        }
    }
}

// En este caso, creamos cada tipo de usuario utilizando la clase espesifica para cada caso.
const usuarioAdmin = new UsuarioAdministrador(
    'Tomi',
    'Garcia',
    'tomigarcia@gmail.com',
);
const usuarioNormal = new Usuario('Alexis', 'Garcia', 'aleg23@gmail.com');

// Ahora, si llamamos al método cambiarEmail del usuario administrador, podemos realizar la operación.
// Si llamamos al método cambiarEmail del usuario normal, no podemos realizar la operación ya que dicho método
// no existe en la clase Usuario.

usuarioAdmin.cambiarEmail('tomigarcia@gmail.com', 'tom456@gmail.com');
usuarioNormal.cambiarEmail('aleg23@gmail.com', 'ale456@gmail.com');
