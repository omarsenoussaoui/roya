# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build output
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration if you have custom config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]