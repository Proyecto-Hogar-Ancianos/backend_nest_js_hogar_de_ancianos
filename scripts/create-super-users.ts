import { DataSource } from 'typeorm';
import { User } from '../src/core/users/domain/entities/user.entity';
import { Role } from '../src/core/roles/domain/entities/role.entity';
import * as bcrypt from 'bcrypt';

// Lista de superusuarios a crear
const superUsers = [
    {
        identification: '604700548',
        name: 'Antony',
        fLastName: 'Monge',
        sLastName: 'Lopez',
        email: 'antony.mongelopez@ucr.ac.cr',
        password: 'tonyml123',
    },
    {
        identification: 'C35380',
        name: 'Jonathan',
        fLastName: 'Moreno',
        sLastName: 'Fajardo',
        email: 'jonathanfajardo406@gmail.com',
        password: 'jona123',
    },
    {
        identification: 'C36589',
        name: 'Luis',
        fLastName: 'Rivera',
        sLastName: 'Lopez',
        email: 'luis.riveralopez@ucr.ac.cr',
        password: 'luis123',
    },
];

// Configuración del DataSource
const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'hogar_de_ancianos',
    entities: [User, Role],
    synchronize: false,
    logging: true,
});

export default async function createSuperUsers() {
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);

    // Verificar si existe el rol "super admin"
    let superAdminRole = await roleRepository.findOne({
        where: { name: 'super admin' },
    });

    if (!superAdminRole) {
        superAdminRole = roleRepository.create({ name: 'super admin' });
        await roleRepository.save(superAdminRole);
        console.log(' Rol "super admin" creado');
    } else {
        console.log(' Rol "super admin" ya existe');
    }

    for (const userData of superUsers) {
        const existingUser = await userRepository.findOne({
            where: [{ identification: userData.identification }, { email: userData.email }],
        });

        if (existingUser) {
            console.log(` Usuario ${userData.name} ya existe, saltando...`);
            continue;
        }

        const hash = await bcrypt.hash(userData.password, 10);

        const user = userRepository.create({
            identification: userData.identification,
            name: userData.name,
            fLastName: userData.fLastName,
            sLastName: userData.sLastName,
            email: userData.email,
            password: hash,
            isActive: true,
            roleId: superAdminRole.id,
        });

        await userRepository.save(user);
        console.log(` Superusuario ${userData.name} creado`);
    }

    console.log('\n Proceso de superusuarios completado');
    await AppDataSource.destroy();
}
