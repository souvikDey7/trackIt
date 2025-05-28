# Real-Time Proximity Tracker

A real-time location sharing web application that allows users to join secure rooms and view how far other users are from the host. Built with Java Spring Boot, WebSocket, and the Geolocation API.

## 🔗 Live Demo

[Try the app](https://trackit-lkhm.onrender.com)

## 📂 Features

- 🔐 Room-based access control for user segregation
- 📍 Real-time location tracking using the browser’s Geolocation API
- 🔁 WebSocket integration for low-latency, bi-directional data flow
- 📊 Distance calculation and dynamic updates between users
- 💾 Location data storage using H2 or PostgreSQL
- 🔄 Automatic WebSocket reconnection handling

## 🛠 Tech Stack

- **Backend:** Java, Spring Boot, WebSocket
- **Frontend:** HTML, JavaScript
- **Database:** H2, mySQL
- **Deployment:** Render

## 🚀 How It Works

1. User opens the app and grants location permission.
2. A WebSocket connection is established to send/receive location updates.
3. Users can join a room using a unique room ID.
4. The app calculates and displays the real-time distance between the current user and others in the room.
