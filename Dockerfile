# Base image
FROM node:18

# Create app directory
WORKDIR /src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

RUN npm run build
RUN npm prune --production
# Expose the port on which the app will run

# Start the server using the production build
CMD ["npm", "run" , "start:dev"]