import { UserResponseInterface } from "../../interfaces/user/user-response.interface";

export const UsersAllData: UserResponseInterface[] = [
    {
        id: 1,
        name: 'Henry Douglas',
        lastName: 'Chavarria Zurita',
        ci: '13061452',
        email: 'douglash.dcz@gmail.com',
        userName: 'douglash',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60', // Imagen mock pro
        roleId: 1,
        roleName: 'Administrador',
        active: true
    },
    {
        id: 2,
        name: 'Mariel',
        lastName: 'Fernandez Ramos',
        ci: '8456123',
        email: 'mariel.fernandez@outlook.com',
        userName: 'marielf',
        imageUrl: '',
        roleId: 2,
        roleName: 'Supervisor',
        active: true
    }
];