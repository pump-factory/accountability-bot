FROM node:20-alpine3.18

# Set /app as working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Use npm ci for a clean, reproducible build
RUN npm ci

# Copy rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/server.js"]
