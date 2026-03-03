# EvacAI: Real-Time Crowd Management & Emergency Navigation

![EvacAI Banner](https://picsum.photos/seed/evacai-banner/1200/400)

**EvacAI** is a high-performance, real-time crowd management and emergency navigation platform designed for large-scale event spaces. It empowers both event organizers and attendees with live data to ensure safety and efficiency during high-density gatherings.

## 🚀 The Mission
"Navigate smarter, not harder." EvacAI aims to eliminate bottleneck congestion and provide immediate emergency response coordination through a synchronized cloud-based ecosystem.

---

## ✨ Key Features

### 👤 The Navigator (User Dashboard)
*   **Real-Time Geofencing:** Uses a **Ray-Casting Algorithm** to identify exactly which zone you are in locally on your device, ensuring privacy and zero lag.
*   **Safety-First Routing:** Generates paths optimized for low density using **Dijkstra’s Algorithm** to avoid over-crowded areas.
*   **Interactive Zone Map:** Visualizes crowd levels with dynamic heat-map styling and real-time user dots.
*   **Emergency SOS:** A high-priority distress signal that broadcasts your location instantly to the admin command center.
*   **Smart Alerts:** Real-time emergency instructions with built-in **Persistence Filtering** to avoid annoying duplicate notifications.

### 🛡️ The Command Center (Admin Central)
*   **Geospatial Zone Editor:** Create and modify event boundaries directly on a satellite map using **Google Maps**.
*   **Live Density Monitor:** Tracks real-time occupancy and automatically classifies zones from 'Free' to 'Over-crowded'.
*   **SOS Response Station:** A dedicated interface for managing active distress signals and marking users as safe.
*   **Manual Overrides:** Proactively redirect traffic by manually setting zone density levels when local conditions change.
*   **Broadcast Manager:** Send targeted or global alerts to all active navigators.

---

## 🧠 Core Algorithms

### 1. Route Optimization (Dijkstra’s vs A*)
EvacAI uses **Dijkstra’s Algorithm** for all pathfinding.
*   **Why not A*?** While A* is faster for massive maps (like cities), Dijkstra’s is superior for event spaces. It guarantees the absolute safest path based on density without the risks of heuristic "guesswork." At the scale of an event (10-50 zones), Dijkstra’s calculates the route in under 1ms, making the speed benefit of A* irrelevant compared to the accuracy of Dijkstra's.

### 2. Geolocation (Ray-Casting)
To determine if a user is inside a zone, we use a **Point-in-Polygon (PIP)** test. By projecting an infinite horizontal ray from the user's GPS coordinates and counting intersections with the zone boundaries, we identify location instantly. This happens on the client side to provide immediate feedback.

---

## 📡 Real-Time Mechanisms

### The SOS Emergency Loop
The SOS system is a live, synchronized boolean state shared between the User and Admin:
1.  **User Trigger:** User confirms SOS → Sets `sos: true` in their cloud profile.
2.  **Admin Reaction:** The Admin Dashboard "listens" via a live stream; the SOS tab pulses red immediately.
3.  **Resolution:** Either the User cancels or the Admin clicks "Mark as Safe."
4.  **Sync:** Flipping the switch to `false` in the cloud instantly stops the pulsing animation on the user's device.

### Smart Alert Persistence
To prevent "Alert Fatigue," EvacAI uses a **Persistence Filter** via `localStorage`:
*   **The Check:** Every alert has a unique **Timestamp**.
*   **The Logbook:** When a user clicks "Acknowledge," the app writes that timestamp to the browser's local memory.
*   **The Result:** On page refresh, the app compares the latest cloud alert to the saved timestamp. If they match, the app knows you've seen it and stays quiet.

---

## 🛠 Tech Stack
*   **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
*   **UI/UX:** [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/)
*   **Backend:** [Firebase Firestore](https://firebase.google.com/products/firestore) (Real-time Database)
*   **Authentication:** [Firebase Auth](https://firebase.google.com/products/auth) (Anonymous & Admin)
*   **Mapping:** [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)
*   **Icons:** [Lucide React](https://lucide.dev/)

---
*Built with safety in mind for the next generation of event management.*