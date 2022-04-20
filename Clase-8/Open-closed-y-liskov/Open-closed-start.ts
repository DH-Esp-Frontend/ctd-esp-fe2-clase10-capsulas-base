import FakeApi from './fakeApi';

interface IUsuario {
    nombre: string;
    apellido: string;
    email: string;
}

// NOTA: Se puede correr el proyecto con el comando yarn run-start.

// Para este ejemplo, partimos de una clase Usuario que tiene ciertos métodos pre definidos.
// Tenemos un método login que nos permite loguearnos en nuestra aplicación.
// Además, tenemos un método cambiarContrasena que nos permite cambiar la contraseña de nuestro usuario. Este método es
// accesible para cualquier usuario.
// Por último, tenemos un método cambiarEmail que nos permite cambiar el email de cualquier usuario. Este método es
// accesible solo para un usuario que tenga permisos de administrador.

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

    async cambiarEmail(email: string, nuevoEmail: string) {
        try {
            await this.API.cambiarEmail(email, nuevoEmail);
            console.log(`Email cambiado con éxito`);
        } catch (error: any) {
            console.log(error.message);
        }
    }
}

// Aquí vamos a crear dos usuarios. Uno de ellos es un usuario administrador, y el otro es un usuario normal.

const usuarioAdmin = new Usuario('Tomi', 'Garcia', 'tomigarcia@gmail.com');
const usuarioNormal = new Usuario('Alexis', 'Garcia', 'aleg23@gmail.com');

// Para el caso del usuario administrador, vemos que podemos utilizar el método camibarEmail sin problemas.

usuarioAdmin.cambiarEmail('tomigarcia@gmail.com', 'tomi1244@gmail.com');

// Pero, ¿que sucede si llamamos el método cambiarEmail de nuestro usuario normal?

usuarioNormal.cambiarEmail('aleg23@gmail.com', 'ale456@gmail.com');

// Como podemos ver, el usuario normal tiene acceso a cambiar su email, pero no debería poder hacer este cambio.
// Para solucionar este problema, tendriamos que sobreescribir el método cambiarEmail de nuestro usuario normal. Pero ello
// no es una buena idea, porque estaríamos violando algunos principios que forman parte de SOLID. Por ello, vamos a
// refactorizar nuestro código para poder cumplir con nuestro objetivo.
