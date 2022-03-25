# pull official base image
FROM node:16.14.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 3001

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

EXPOSE 80
EXPOSE 3000
EXPOSE 3001

# start app
CMD ["npm", "start"]