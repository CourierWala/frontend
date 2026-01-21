FROM node:22-slim

WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Install dependencies INSIDE container
RUN npm install

# Copy rest of the source code
COPY . .

# Expose Vite port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
