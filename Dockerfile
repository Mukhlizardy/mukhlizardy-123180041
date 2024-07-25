FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5100
CMD ["npm", "start"]