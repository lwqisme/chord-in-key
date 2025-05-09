#!/bin/bash

# Exit on error
set -e

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if Node.js is installed
if ! command_exists node; then
  echo "Node.js is not installed. Installing Node.js..."
  
  # Update package index
  sudo apt-get update
  
  # Install Node.js
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  
  echo "Node.js installed successfully."
fi

# Check if Nginx is installed
if ! command_exists nginx; then
  echo "Nginx is not installed. Installing Nginx..."
  
  # Update package index
  sudo apt-get update
  
  # Install Nginx
  sudo apt-get install -y nginx
  
  echo "Nginx installed successfully."
fi

echo "Deploying Chord In Key application..."

# Build the React application
npm install
npm run build

# Configure Nginx
sudo tee /etc/nginx/sites-available/chord-in-key > /dev/null << EOL
server {
    listen 80;
    server_name _;

    root $(pwd)/build;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOL

# Enable the site
sudo ln -sf /etc/nginx/sites-available/chord-in-key /etc/nginx/sites-enabled/

# Remove default site if it exists
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

echo "Deployment completed successfully!"
echo "The application is now running at http://localhost"
