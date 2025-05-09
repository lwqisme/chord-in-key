# Chord In Key - Guitar Chord Memorization App

A web application to help guitarists memorize the correct chords in different keys. The app presents random keys and chord positions, challenging users to select the correct chord from multiple options.

![Chord In Key App](https://via.placeholder.com/800x400?text=Chord+In+Key+App)

## Features

- Random key selection from C, A, G, E, D
- Random chord position (level) selection from 1-7
- Multiple choice options for chord selection
- Immediate feedback on correct/incorrect answers
- Score tracking
- Educational information about chord functions
- Responsive design for desktop and mobile

## Table of Contents

- [Development](#development)
- [Deployment Options](#deployment-options)
  - [Docker Deployment](#docker-deployment)
  - [Simple Server Deployment](#simple-server-deployment)
  - [Manual Deployment](#manual-deployment)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/chord-in-key.git
   cd chord-in-key
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser (or another port if 3000 is in use).

## Deployment Options

### Docker Deployment

The easiest way to deploy this application on any Linux system is using Docker.

#### Prerequisites

- Docker
- Docker Compose

#### Deployment Steps

1. Clone the repository on your server:
   ```
   git clone https://github.com/yourusername/chord-in-key.git
   cd chord-in-key
   ```

2. Run the deployment script:
   ```
   ./scripts/deploy.sh
   ```

   This script will:
   - Install Docker and Docker Compose if they're not already installed
   - Build the Docker image
   - Start the container

3. Access the application at `http://your-server-ip`

### Simple Server Deployment

For servers without Docker, you can use the simple deployment script.

#### Prerequisites

- A Linux server with sudo access

#### Deployment Steps

1. Clone the repository on your server:
   ```
   git clone https://github.com/yourusername/chord-in-key.git
   cd chord-in-key
   ```

2. Run the simple deployment script:
   ```
   ./scripts/deploy-simple.sh
   ```

   This script will:
   - Install Node.js if it's not already installed
   - Install Nginx if it's not already installed
   - Build the React application
   - Configure Nginx to serve the application

3. Access the application at `http://your-server-ip`

### Manual Deployment

If you prefer to deploy manually or to a different hosting service:

1. Build the application:
   ```
   npm run build
   ```

2. The production-ready files will be in the `build` directory.

3. Deploy these files to any static hosting service like:
   - Nginx
   - Apache
   - Amazon S3
   - Netlify
   - Vercel
   - GitHub Pages

## Project Structure

```
chord-in-key/
├── public/                 # Static files
├── scripts/                # Deployment scripts
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── ChordGame.js    # Main game component
│   │   └── ChordGame.css   # Styles for the game
│   ├── App.js              # Main App component
│   └── index.js            # Entry point
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx configuration
└── README.md               # Documentation
```

## Customization

### Adding More Keys

To add more keys, modify the `chordData` object in `src/components/ChordGame.js`:

```javascript
const chordData = {
  // Existing keys...

  // Add a new key
  F: {
    1: 'F',
    2: 'Gm',
    3: 'Am',
    4: 'Bb',
    5: 'C',
    6: 'Dm',
    7: 'Edim'
  }
};
```

### Changing the UI

Modify the CSS in `src/components/ChordGame.css` to customize the appearance.

## Troubleshooting

### Application Not Starting

- Check if Node.js and npm are installed correctly
- Ensure all dependencies are installed with `npm install`
- Check for errors in the console

### Deployment Issues

- Ensure the server has the necessary permissions
- Check if ports 80/443 are open and not in use
- Verify that Nginx/Docker is running correctly

For more help, please open an issue on the GitHub repository.
