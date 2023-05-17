FROM node:18.12.0

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/
RUN npm install --global npm@8.19.2
RUN npm install

COPY . /app/

CMD ["npm", "start"]
