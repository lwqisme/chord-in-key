#!/bin/bash

# Exit on error
set -e

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if Docker is installed
if ! command_exists docker; then
  echo "Docker is not installed. Installing Docker..."
  
  # Update package index
  sudo apt-get update
  
  # Install prerequisites
  sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
    
  # Add Docker's official GPG key
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  
  # Set up the stable repository
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
  # Install Docker Engine
  sudo apt-get update
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io
  
  # Add current user to docker group to avoid using sudo
  sudo usermod -aG docker $USER
  
  echo "Docker installed successfully. You may need to log out and log back in for group changes to take effect."
fi

# Check if Docker Compose is installed
if ! command_exists docker-compose; then
  echo "Docker Compose is not installed. Installing Docker Compose..."
  
  # Install Docker Compose
  sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  
  echo "Docker Compose installed successfully."
fi

echo "Deploying Chord In Key application..."

# Build and start the Docker container
docker-compose up -d --build

echo "Deployment completed successfully!"
echo "The application is now running at http://localhost"
