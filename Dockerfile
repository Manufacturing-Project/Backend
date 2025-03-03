# Stage 1: Build the NestJS app
FROM node:16-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the NestJS application (this compiles TypeScript to JavaScript)
RUN npm run build

# Stage 2: Run the NestJS app in production
FROM node:16-alpine
WORKDIR /app

# Copy only the package files for production install
COPY package*.json ./
RUN npm install --only=production

# Copy the compiled output from the builder stage
COPY --from=builder /app/dist ./dist

COPY .env .env

# Expose the port your NestJS app uses (default is 3000)
EXPOSE 8080

# Run the NestJS application
CMD ["node", "dist/main.js"]
