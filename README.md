# [ST2OOS] - OO Systems Development

This backend project is use for web application of subscriber manager. Here, you can add and see you members with there licence, data, and membership. You can also see the competition list to subscribe with all the information as need about competition.

## Project structure
```
├── node_modules             # Project module you have to import locally
├── prisma/                  # Prisma schema and migration
│   ├── seed.js              # Data fixtures
├── src/ 
│   ├── generated/           # Prisma generated you have to generated locally  
│   ├── routes            
│   │   ├── db/              # Database route files 
│   │   ├── index.js         # Main routes files
│   ├── env.js.              # Environnement backend variable 
│   ├── index.js             # Entry point 
│   ├── prisma.js            # Database connection with PrismaClient 
├── .example.env             # Local envrionnement example variable 
├── .env                     # Local environnement variable 
├── .gitignore.              # Gitignore file 
├── docker-compose           # Docker-compose to create your database container 
├── package-lock.json        # Lock json configuration 
├── package.json             # Json configuration 
└── README.md                # Marckdown file 
```

##  Installation

### Clone the repository
```
git init
```
```
git clone
```

### Docker installation
```
docker-compose up -d 
```

### Node JS installation
```
npm install node
```
```
npm install express
````

### Prisma intallation
[Prisam with Javascript documentation](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction#3-importing-prisma-client)
```
npm install prisma --save-dev
npx prisma
```
```
npm install @prisma/client
```
```
npx prisma migrate dev --name init
npx prisma generate
npm run seed
```

## Routes
### /member
* /all
* /:id
* /:email
* /delete/:id
* /create
* update/:id

### /membership 
* /all
* /:id
* /:name
* /add

### /licence
* /all
* /:id
* /:number
* /:types
* /add

### /contact
* /name
* /:phoneNumber
* /add

### /competition
* /all
* /:id
* /byClub/:club
* /byDate/:date
* /byAddress/:addressId
* /add

### /address
* /all
* /:id
* /getId
* /add
