# Build stage
FROM node:20-alpine as build

# Set environment variables for npm
ARG npm_config_registry=https://registry.npmmirror.com/
ENV npm_config_registry=${npm_config_registry}

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm config set registry https://registry.npmmirror.com/ && \
    npm install --no-fund --no-audit --prefer-offline --registry=https://registry.npmmirror.com/

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from build stage to nginx serve directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
