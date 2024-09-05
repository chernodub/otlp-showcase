# Full-stack opentelemtry-based observability showcase

![image](./docs/Screenshot%202024-09-05%20at%2013.24.38.png)

This project demonstrates a comprehensive observability setup for a modern full-stack application, highlighting best practices in monitoring and troubleshooting distributed systems.

## Project Overview

The showcase consists of a simple yet realistic application architecture, incorporating:
* A frontend application
* A backend service
* A microservice
* A complete observability stack

This setup allows developers and operations teams to gain insights into the entire application ecosystem, from user interactions to inter-service communications.

## Key Components

**Application Stack:**
* Frontend: A simple vanilla web application that logs user actions and sends requests to the backend
* Backend: A service that handles frontend requests and communicates with the microservice
* Microservice: A private service accessible only to the backend within the internal network

**Observability Stack:**
* OpenTelemetry Collector: Centralizes the collection and processing of telemetry data
* Grafana: Provides a unified dashboard for visualizing all observability data
* Tempo: Handles distributed tracing
* Loki: Manages log aggregation and analysis
* Prometheus: Collects and stores time-series metrics

## Features

* End-to-End Tracing: Visualize request flows from the frontend through the backend and microservice
* Centralized Logging: Aggregate logs from all components for easy searching and analysis
* Comprehensive Metrics: Monitor system health, performance, and business-relevant indicators
* Unified Interface: Access all telemetry data through a single Grafana interface


## Running the infrastructure

```
docker compose up --build
```

## Tradeoffs

https://github.com/open-telemetry/opentelemetry-js/blob/main/doc/esm-support.md