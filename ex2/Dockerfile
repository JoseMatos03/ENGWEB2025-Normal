# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Define build arguments
ARG FRONTEND_PORT
ARG BACKEND_PORT

# Define environment variables using build arguments
ENV BACKEND_PORT=$BACKEND_PORT
ENV FRONTEND_PORT=$FRONTEND_PORT

# Make port available to the world outside this container
EXPOSE ${FRONTEND_PORT}

# Define environment variable
ENV PORT=${FRONTEND_PORT}

# Run app.js when the container launches
CMD ["npm", "start"]

