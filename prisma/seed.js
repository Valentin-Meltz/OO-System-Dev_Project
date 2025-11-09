import { PrismaClient } from '@prisma/client';;

const prisma = new PrismaClient();

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomBool() {
  return Math.random() > 0.5;
}

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  await prisma.member.deleteMany();
  await prisma.licence.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.address.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.competition.deleteMany();

  const cities = ['Paris', 'Lyon', 'Marseille', 'Nice', 'Toulouse'];
  const addresses = [];
  for (let i = 0; i < 20; i++) {
    addresses.push(await prisma.address.create({
      data: {
        address: `Street ${i + 1}`,
        zipcode: `750${i}`,
        city: randomFromArray(cities),
      }
    }));
  }

  const memberships = [];
  for (let i = 0; i < 5; i++) {
    memberships.push(await prisma.membership.create({
      data: {
        name: `Membership ${i + 1}`,
        price: Math.floor(Math.random() * 500) + 50,
      }
    }));
  }

  const licences = [];
  for (let i = 0; i < 50; i++) {
    licences.push(await prisma.licence.create({
      data: {
        number: `LIC${1000 + i}`,
        type: randomFromArray(['A', 'B', 'C']),
        price: Math.floor(Math.random() * 100) + 20,
      }
    }));
  }

  const contacts = [];
  for (let i = 0; i < 50; i++) {
    contacts.push(await prisma.contact.create({
      data: {
        firstname: `Firstname${i + 1}`,
        lastname: `Lastname${i + 1}`,
        phoneNumber: `06${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
      }
    }));
  }

  for (let i = 0; i < 50; i++) {
    await prisma.member.create({
      data: {
        email: `member${i + 1}@mail.com`,
        firstname: `Firstname${i + 1}`,
        lastname: `Lastname${i + 1}`,
        birthdate: randomDate(new Date(1980,0,1), new Date(2010,0,1)),
        phoneNumber: `06${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
        equipment: randomBool(),
        addressId: randomFromArray(addresses).id,
        membershipId: randomFromArray(memberships).id,
        licenceId: licences[i].id,
        contactId: contacts[i].id,
      }
    });
  }

  for (let i = 0; i < 20; i++) {
    await prisma.competition.create({
      data: {
        club: `Club ${i + 1}`,
        date: randomDate(new Date(), new Date(2025,11,31)),
        addressId: randomFromArray(addresses).id,
      }
    });
  }

  console.log("Seed terminé !");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
