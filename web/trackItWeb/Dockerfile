# Stage 1: Build the Angular application
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY trackItWeb/src/app/package*.json ./

# Install dependencies
RUN npm install

# Copy the Angular project files
COPY trackItWeb/src/app ./

# Build the Angular project for production
RUN npm run build --prod

# Stage 2: Serve the application using NGINX
FROM nginx:alpine

# Copy built Angular files to NGINX HTML directory
COPY --from=build /app/dist/trackItWeb /usr/share/nginx/html

# Copy custom NGINX configuration (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port NGINX will serve on
EXPOSE 4200

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]