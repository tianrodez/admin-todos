# Development

Pasos para levantar la app en desarrollo

- Levantar la base de datos

```
docker compose up -d
```

- Crear una copia de .env.template y renombrarlo a .env
- Reemplazar las variables de entorno
- Ejecutar el comando `npm install`
- Ejecutar el comando `npm run dev`
- Ejecuta el comando `npx prisma migrate dev`
- Ejecuta el comando `npx prisma generate`
- Ejecutar seed para [llenar la base de datos](http://localhost:3000/api/seed)

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
