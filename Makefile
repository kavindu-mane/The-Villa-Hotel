dev:
	bun dev

generate:
	bunx prisma generate --no-engine

push:
	bunx prisma db push

studio:
	bunx prisma studio

start:
	bun run start

build:
	bun run build