FROM node:10.16.2 as builder

WORKDIR /var/www

COPY package.json package.json
COPY . .

RUN npm install;

FROM node:10.16.2 as runtime

EXPOSE 80 3000 9229

WORKDIR /var/www

COPY --from=builder /var/www/. .

CMD ["npm", "start"]