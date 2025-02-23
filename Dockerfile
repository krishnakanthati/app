# Use an official Node.js runtime as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the default Vite dev server port (usually 5173)
EXPOSE 5173

# Start the Vite development server with host flag to expose to the network
CMD ["npm", "run", "dev", "--", "--host"]
