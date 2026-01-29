# FROM node:22-slim

# WORKDIR /app

# # Copy only package files first
# COPY package*.json ./

# # Install dependencies INSIDE container
# RUN npm install

# # Copy rest of the source code
# COPY . .

# # Expose Vite port
# EXPOSE 5173

# # Start Vite dev server
# CMD ["npm", "run", "dev", "--", "--host"]


#NEW DOCKERFILE
# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

