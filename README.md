
# Planify

Planify is a Express.js-based API designed to simplify ticket booking for stadium events. This project allows users to easily manage event bookings and integrates with MongoDB for data storage.


## Features

- **Event Management**: Create, update, and delete events.
- **Ticket Booking**: Book tickets for specific events.
- **User Management**: Register, authenticate, and manage users.
- **Stadium Management**: Create, update, and delete stadiums.
- **Docker Support**: Run  MongoDB using Docker Compose.


## Installation

Provide step-by-step instructions for setting up the project locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/YoussefNKH/Planify.git
   cd Planify
2. Install dependencies:
   ```bash
   npm install
3. Set up environment variables:

Open the `.env` file and add the following variables:

```env
PORT=3000
MONGO_URI=mongodb://mongo:27017/planify
JWT_SECRET=your_jwt_secret
```
## API Reference

## Event Routes

#### POST /events
Create a new event (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### GET /events
Get a list of all events.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### GET /events/recherche
Search events based on criteria (name, description, location, category, status).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | Name of the event (optional)|
| `location` | `string` | Location of the event (optional) |
| `category` | `string` | Category of the event (optional) |
| `status`  | `string` | Status of the event (optional) |
| `api_key` | `string` | **Required**. Your API key |

#### GET /events/actifs
Get active events.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### GET /events/categorie/:categorie
Get events by category.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `categorie` | `string` | Category of the event |
| `api_key` | `string` | **Required**. Your API key |

#### GET /events/complets
Get fully booked events.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### GET /events/lieu/:lieu
Get events by location.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `lieu`    | `string` | Location of the event |
| `api_key` | `string` | **Required**. Your API key |

#### GET /events/stade/:stadeId
Get events by stadium.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `stadeId` | `string` | Stadium ID |
| `api_key` | `string` | **Required**. Your API key |

#### GET /events/:id/details
Get details of a specific event.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Event ID |
| `api_key` | `string` | **Required**. Your API key |

#### PATCH /events/:id/incrementer-billets
Increment the number of tickets sold for an event (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Event ID |
| `num_billets` | `integer` | Number of tickets to increment |
| `api_key` | `string` | **Required**. Your API key |

#### GET /events/plage-dates
Get events within a date range.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `start_date` | `string` | Start date (YYYY-MM-DD) |
| `end_date`   | `string` | End date (YYYY-MM-DD) |
| `api_key` | `string` | **Required**. Your API key |

#### PUT /events/:id
Update an event by ID (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Event ID |
| `data`    | `object` | **Required**. Event data to update |
| `api_key` | `string` | **Required**. Your API key |

#### DELETE /events/:id
Delete an event by ID (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Event ID |
| `api_key` | `string` | **Required**. Your API key |

---

### Reservation Routes

#### POST /reservations
Create a reservation.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `event_id` | `string` | Event ID to reserve |
| `user_id` | `string` | User ID |
| `tickets` | `integer` | Number of tickets to reserve |
| `api_key` | `string` | **Required**. Your API key |

#### POST /reservations/:reservationId/pay
Pay for a reservation.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `reservationId` | `string` | **Required**. Reservation ID |
| `api_key` | `string` | **Required**. Your API key |

#### GET /reservations
Get all reservations (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### GET /reservations/utilisateur/:utilisateurId
Get reservations by user ID.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `utilisateurId` | `string` | **Required**. User ID |
| `api_key` | `string` | **Required**. Your API key |

#### GET /reservations/evenement/:evenementId
Get reservations by event ID.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `evenementId` | `string` | **Required**. Event ID |
| `api_key` | `string` | **Required**. Your API key |

#### PUT /reservations/:id
Update a reservation.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Reservation ID |
| `data`    | `object` | **Required**. Reservation data to update |
| `api_key` | `string` | **Required**. Your API key |

#### DELETE /reservations/:id
Delete a reservation (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Reservation ID |
| `api_key` | `string` | **Required**. Your API key |

---

### Stadium Routes

#### POST /stades
Create a stadium (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### GET /stades
Get all stadiums.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### GET /stades/:id
Get a stadium by ID.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Stadium ID |
| `api_key` | `string` | **Required**. Your API key |

#### GET /stades/nom
Get stadiums by name.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | **Required**. Stadium name |
| `api_key` | `string` | **Required**. Your API key |

#### GET /stades/ville
Get stadiums by city.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `city`    | `string` | **Required**. City name |
| `api_key` | `string` | **Required**. Your API key |

#### PUT /stades/:id
Update a stadium by ID (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Stadium ID |
| `data`    | `object` | **Required**. Stadium data to update |
| `api_key` | `string` | **Required**. Your API key |

#### DELETE /stades/:id
Delete a stadium by ID (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Stadium ID |
| `api_key` | `string` | **Required**. Your API key |

---

### Ticket Routes

#### GET /tickets
Get all tickets (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### GET /tickets/numero/:numero
Get a ticket by number (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `numero`  | `string` | **Required**. Ticket number |
| `api_key` | `string` | **Required**. Your API key |

#### GET /tickets/utilisateur/:utilisateur
Get tickets by user.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `utilisateur` | `string` | **Required**. User ID |
| `api_key` | `string` | **Required**. Your API key |

#### PUT /tickets/:id
Update a ticket by ID (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Ticket ID |
| `data`    | `object` | **Required**. Ticket data to update |
| `api_key` | `string` | **Required**. Your API key |

#### DELETE /tickets/:id
Delete a ticket by ID (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Ticket ID |
| `api_key` | `string` | **Required**. Your API key |

---

### User Routes

#### POST /utilisateurs/register
Register a new user.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. User email |
| `password`| `string` | **Required**. User password |
| `api_key` | `string` | **Required**. Your API key |

#### POST /utilisateurs/login
Authenticate a user.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. User email |
| `password`| `string` | **Required**. User password |
| `api_key` | `string` | **Required**. Your API key |

#### GET /utilisateurs
Get all users (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### GET /utilisateurs/:id
Get a user by ID (Admin and User).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. User ID |
| `api_key` | `string` | **Required**. Your API key |

#### GET /utilisateurs/email/:address_mail
Get users by email (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `address_mail` | `string` | **Required**. Email address |
| `api_key` | `string` | **Required**. Your API key |

#### PUT /utilisateurs/:id
Update a user by ID (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. User ID |
| `data`    | `object` | **Required**. User data to update |
| `api_key` | `string` | **Required**. Your API key |

#### DELETE /utilisateurs/:id
Delete a user by ID (Admin only).

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. User ID |
| `api_key` | `string` | **Required**. Your API key |

## Project Structure
```plaintext
Planify/
├── backend/               # Backend source code
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Custom middlewares
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── server.js          # Express server setup
├── node_modules/          # Node.js dependencies
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── docker-compose.yml     # Docker Compose setup
├── package-lock.json      # Lock file for dependencies
├── package.json           # Node.js dependencies
└── README.md              # Project documentation
```
## Usage
1.Run the project using Docker Compose:
  ```bash
  docker-compose up --build
  ```
2.Run this command:
 ```bash
  npm run dev
  ```
3.The app will be accessible at:
 ```http
 http://localhost:PORT_you_put_in_the_.env_file
 ```
4.Test it with Postman

## Authors

- [@youssefNKH](https://github.com/YoussefNKH)

