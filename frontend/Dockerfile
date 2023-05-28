FROM node:18.12.0

WORKDIR /app

COPY app/package.json /app/
COPY app/package-lock.json /app/
RUN npm install

COPY ./app /app/

CMD ["npm", "start"]
