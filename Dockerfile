# frontend/Dockerfile

# Build step
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serve with NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ../nginx.conf /etc/nginx/conf.d/default.conf
