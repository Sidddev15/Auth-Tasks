import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    const email = 'demo@todo.local';
    const passwordHash = await bcrypt.hash('demo123', 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            passwordHash,
            name: 'Demo User',
            todo: {
                create: [
                    { title: 'Learn Express + TS' },
                    { title: 'Wire Prisma + Postgres', completed: true },
                ],
            },
        },
        include: { todo: true },
    });

    console.log('Seeded:', { user: user.email, todos: user.todo.length });
}

main()
    .then(() => console.log('✅ Seed complete'))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
