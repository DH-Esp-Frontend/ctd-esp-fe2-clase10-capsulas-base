interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    contrasena: string;
}

type Usuarios = Usuario[];

const usuariosFalsos: Usuarios = [
    {
        id: 1,
        nombre: 'Tomi',
        apellido: 'Garcia',
        email: 'tomigarcia@gmail.com',
        contrasena: 'Tomi1234',
    },
    {
        id: 2,
        nombre: 'Alexis',
        apellido: 'Garcia',
        email: 'aleg23@gmail.com',
        contrasena: 'Alexis1234',
    },
];

export default class FakeApi {
    async login(
        email: Usuario['email'],
        contrasena: Usuario['contrasena'],
    ): Promise<Usuario> {
        return new Promise((resolve, reject) => {
            const usuarioExistente = usuariosFalsos.find(
                (usuario) =>
                    usuario.email === email &&
                    usuario.contrasena === contrasena,
            );

            if (usuarioExistente) {
                resolve(usuarioExistente);
            } else {
                reject(new Error('Usuario o contraseña incorrectos'));
            }
        });
    }

    public async cambiarContrasena(
        email: Usuario['email'],
        contrasena: Usuario['contrasena'],
        nuevaContrasena: Usuario['contrasena'],
    ): Promise<Usuario> {
        return new Promise((resolve, reject) => {
            const usuarioExistente = usuariosFalsos.find(
                (usuario) =>
                    usuario.email === email &&
                    usuario.contrasena === contrasena,
            );

            if (usuarioExistente) {
                usuarioExistente.contrasena = nuevaContrasena;
                resolve(usuarioExistente);
            } else {
                reject(new Error('Usuario o contraseña incorrectos'));
            }
        });
    }

    public async cambiarEmail(
        email: Usuario['email'],
        nuevoEmail: Usuario['email'],
    ): Promise<Usuario> {
        return new Promise((resolve, reject) => {
            const usuarioExistente = usuariosFalsos.find(
                (usuario) => usuario.email === email,
            );

            if (usuarioExistente) {
                usuarioExistente.email = nuevoEmail;
                resolve(usuarioExistente);
            } else {
                reject(new Error('Usuario o contraseña incorrectos'));
            }
        });
    }
}
