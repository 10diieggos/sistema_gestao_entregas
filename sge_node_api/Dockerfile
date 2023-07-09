# Use an official Node.js runtime as the base image
FROM node:18.16.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application's dependencies in the container
RUN npm ci --only=production

# Copy the rest of the application's files to the container
COPY . .

# Specify the command to run when the container starts
CMD [ "npm", "run", "start:prod" ]
