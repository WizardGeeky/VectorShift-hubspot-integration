# 🧩 VectorShift – Integrations Technical Assessment

This repository contains the completed technical assessment for **VectorShift**. It includes full-stack integration of **HubSpot OAuth**, along with item retrieval and rendering functionality using **FastAPI (Python)** and **React (JavaScript)**.

---

## 📦 Tech Stack

- **Frontend**: React (JavaScript)
- **Backend**: FastAPI (Python)
- **OAuth Provider**: HubSpot
- **Cache/Token Store**: Redis

---


---

## ✅ Part 1: HubSpot OAuth Integration

### 🔐 Backend: `/backend/integrations/hubspot.py`

- **`authorize_hubspot()`**  
  Initiates the OAuth flow and returns the HubSpot authorization URL.

- **`oauth2callback_hubspot()`**  
  Handles the OAuth2 callback from HubSpot and exchanges the code for tokens.

- **`get_hubspot_credentials()`**  
  Retrieves valid HubSpot credentials using refresh tokens or stored tokens.

### ⚛️ Frontend: `/frontend/src/integrations/hubspot.js`

- Implements logic for:
  - Triggering the HubSpot OAuth flow.
  - Handling successful authorization state.
  - Updating UI to reflect connection status.

- HubSpot integration added to global integrations UI for discoverability.

---

## ✅ Part 2: Loading HubSpot Items

### 📥 `get_items_hubspot()`

- Fetches **HubSpot Contacts** as the primary resource.
- Calls:  
  `GET https://api.hubapi.com/crm/v3/objects/contacts`

- Maps results into standard `IntegrationItem` format with fields like:
  - `id`
  - `name`
  - `email`
  - `created_at`

- Prints the final list to the **console**.

---

## 🚀 Getting Started

### 🖥 Frontend Setup

- cd frontend
- npm install
- npm run start

---

### 🖥 Backend Setup

- cd backend
- pip install -r requirements.txt
- uvicorn main:app --reload

### 🔁 Redis Setup
Make sure Redis is installed and running
- redis-server


### 🧪 Testing
- Connect your HubSpot account using the frontend.

- Confirm successful OAuth flow.

- Run backend and view logged items from HubSpot in the console.

