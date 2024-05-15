# Real-time Redis Driven WS Hub

![System Architecture](/client/public/arch.png)

## Overview

This project implements a WebSocket with PubSub & Queues in Redis. The React is connected to the express server which add events to the Queue and the worker pickes up from the queue and sends it to the PubSub which then send it to the WebSocket server that is subscribed to it, The WebSocket server sends it back to the browser.

## Features

- WebSocket server for real-time communication
- Redis integration for Pub/Sub & Queues

## Technologies Used

- Node.js for WebSocket server
- Redis for Pub/Sub
- JavaScript for scripting
- GitHub for version control and collaboration

## Usage

- Users can send the events to the Redis Queue and the Workers and pick them one-by-one
- The server subscribes to Redis pub/sub channels for incoming messages.
- Upon receiving messages from users, the server broadcasts relevant events to connected clients.
