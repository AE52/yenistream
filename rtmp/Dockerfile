FROM tiangolo/nginx-rtmp
FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY auth.js ./
CMD ["npm", "start"]
COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /www/
COPY livestream.html /www/