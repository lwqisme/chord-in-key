#!/bin/bash

# Exit on error
set -e

echo "Building Chord In Key application..."

# Install dependencies
npm install

# Build the React application
npm run build

echo "Build completed successfully!"
echo "The production files are in the 'build' directory."
