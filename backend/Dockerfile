FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY sequelize.config.js ./. 
COPY .sequelizerc ./. 
COPY src ./src
ENV NODE_ENV=development
RUN npm run build
EXPOSE 4000
CMD ["node", "dist/server.js"] 