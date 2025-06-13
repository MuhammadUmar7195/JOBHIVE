FROM node:latest

# Update package lists and upgrade packages to reduce vulnerabilities
# Recommended for linux-debain based users
RUN apt-get update && apt-get upgrade -y && apt-get clean

WORKDIR /app

# Copy package files first for better cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

EXPOSE 8000

CMD [ "npm", "run", "dev" ]