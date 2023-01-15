# What's This

This is my take on coding along with the Ben Awad's [Full Stack React GraphQL TypeScript Tutorial](https://www.youtube.com/watch?v=I6ypD7qv3Z8)

# How Do I Run This

## Prerequisites

1. [Docker](https://www.docker.com/products/docker-desktop/)
2. [NodeJs](https://nodejs.org/en/download/) (+ [yarn](https://yarnpkg.com/getting-started/install))

## Backend

1. `cd` into `backend` folder.
2. Run `docker-compose up` to bring up PostgreSQL and Redis databases.
3. Run `yarn watch` to compile TypeScript code into runnable JavaScript.
4. Run `yarn dev` to start backend server.

## Frontend

1. `cd` into `frontend` folder.
2. Run `yarn codegen:watch` to start [GraphQL Code Generator](https://the-guild.dev/graphql/codegen/docs/getting-started) (optional if you don't change `graphql/**/*.tsx` files that contain queries and mutations).
3. Run `yarn dev` to start NextJS server that will serve the UI.

# Notes

1. I'm using [prisma](https://www.prisma.io/) instead of [MikroORM](https://mikro-orm.io/) and [TypeORM](https://typeorm.io/) that Ben uses in tutorial. IMO it's much nicer to use and supports all required features out of the box without the need to resolve to writing raw SQL code.
2. I'm using [Apollo Client](https://www.apollographql.com/docs/react) instead of [urql](https://formidable.com/open-source/urql/), IMO developer experience is much nicer with Apollo, just look how Ben struggles with the cache updates.
