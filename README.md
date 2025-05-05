# Development

Pasos para levantar la app en desarrollo

- Levantar la base de datos

```
docker compose up -d
```

- Renombrar el .env.template a .env
- Reemplazar las variables de entorno
- Ejecutar seed para [llenar la base de datos](http://localhost:3000/api/seed)

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
