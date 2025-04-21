# api-k8s-demo

This project is a Node.js application that provides a simple API with monitoring capabilities using Prometheus metrics. It is designed to be deployed in a local Kubernetes cluster using a self-hosted GitHub Actions runner.

## Features

- **Node.js API**: Includes endpoints for basic functionality and Prometheus metrics.
- **Prometheus Integration**: Exposes metrics for monitoring API performance.
- **GitHub Actions CI/CD Pipeline**: Automates testing, linting, Docker image building, and deployment.
- **Kubernetes Deployment**: Deploys the application to a local Kubernetes cluster.

---

## Project Structure

- **Node.js Application**: The main application is implemented in [`index.js`](#file:index.js).
- **GitHub Actions Pipeline**: The CI/CD pipeline is defined in [`docker-publish.yml`](#file:docker-publish.yml).
- **Kubernetes Deployment**: The Kubernetes deployment manifests are located in the `k8s/` directory, including [`deployment.yaml`](#file:deployment.yaml).

---

## Endpoints

### `/ping`
Responds with a simple JSON message: `{ "message": "pong" }`.

### `/metrics`
Exposes Prometheus metrics for monitoring.

### `/error`
Simulates an error response with a 500 status code.

---

## CI/CD Pipeline

The CI/CD pipeline is defined in [`.github/workflows/docker-publish.yml`](#file:docker-publish.yml). It includes the following jobs:

1. **Test**: Runs unit tests using Jest.
2. **Lint**: Lints the codebase using ESLint.
3. **Build and Push Docker Image**: Builds a Docker image and pushes it to Docker Hub.
4. **Deploy**: Deploys the application to a local Kubernetes cluster using `kubectl`.

---

## Kubernetes Deployment

The application is deployed to a local Kubernetes cluster using the manifests in the `k8s/` directory:

- [`namespace.yaml`](k8s/namespace.yaml): Defines the `demo-api` namespace.
- [`rbac.yaml`](k8s/rbac.yaml): Configures RBAC permissions for the application.
- [`deployment.yaml`](#file:deployment.yaml): Defines the deployment for the application.
- [`service.yaml`](k8s/service.yaml): Exposes the application as a NodePort service.

---

## Local Deployment Steps

1. **Build and Push Docker Image**:
   The pipeline automatically builds and pushes the Docker image to Docker Hub.

2. **Apply Kubernetes Manifests**:
   The deployment job in the pipeline applies the Kubernetes manifests using `kubectl`.

3. **Access the Application**:
   - Access the API at `http://<node-ip>:<node-port>/ping`.
   - Access Prometheus metrics at `http://<node-ip>:<node-port>/metrics`.

---

## Monitoring

The application integrates with Prometheus to expose the following metrics:

- `http_requests_total`: Total number of HTTP requests to `/ping`.
- `http_response_duration_seconds`: Histogram of response durations.
- `http_errors_total`: Total number of simulated errors.

---

## Requirements

- **Node.js**: Version 20 or higher.
- **Docker**: For building and running the application.
- **Kubernetes**: Local cluster (e.g., Minikube).
- **GitHub Actions**: Self-hosted runner for deployment.

---

## Running Locally

1. Install dependencies:
   ```sh
   npm install