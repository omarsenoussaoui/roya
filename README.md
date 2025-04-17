# Roya

This repository contains the Roya application built with React and Vite, configured to run in Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (optional, for local development)

## Quick Start

### Using Docker

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/roya.git
   cd roya
   ```

2. Build the Docker image:
   ```bash
   docker build -t roya .
   ```

3. Run the container:
   ```bash
   docker run -p 8080:80 roya
   ```

4. Access the application at [http://localhost:8080](http://localhost:8080)

## Development

### Local Development

If you want to develop without Docker:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Access the development server at [http://localhost:5173](http://localhost:5173)