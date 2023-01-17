# ----- DEPS -----

FROM node:19 as deps
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile

# ----- BUILDER -----

FROM node:19 as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma
COPY . .
RUN yarn prisma generate
RUN yarn build && yarn cache clean

# ----- RUNNER -----

FROM node:19 as runner
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app ./
USER node
CMD ["node", "dist/src/index.js"]
