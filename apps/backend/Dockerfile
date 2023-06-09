FROM node:lts AS builder
# RUN apk update
# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=backend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:lts AS installer
# RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN npm install -g turbo
RUN turbo run build --filter=backend...

FROM node:lts AS runner
WORKDIR /app

# # Don't run production as root
# RUN addgroup --system --gid 1001 expressjs
# RUN adduser --system --uid 1001 expressjs
# USER expressjs
COPY --from=installer /app .

WORKDIR /app/apps/backend
RUN npx prisma generate

EXPOSE 8080
CMD [ "npm", "run", "start" ]