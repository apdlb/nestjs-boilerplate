# Node 18 used because: https://github.com/nodejs/docker-node/issues/1912
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json pnpm-lock.yaml ./

# Install PNPM globally
RUN npm install -g pnpm

# Install project dependencies using PNPM
RUN pnpm install

COPY . .

RUN pnpm run prisma:generate

# Copy the rest of the application code

# Expose the port on which the NestJS application will run (change it if necessary)
EXPOSE 3000

CMD [ "pnpm", "run", "start:dev" ]
