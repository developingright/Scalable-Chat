# WebSocket Chat App Boilerplate with Redis Pub/Sub

This is a simple WebSocket-based chat application boilerplate that incorporates Redis pub/sub to make the system scalable across multiple instances. This project demonstrates a basic chat functionality using WebSockets, along with a Redis pub/sub system to ensure messages are broadcast to all connected clients, even when multiple instances are deployed.

# Redis Pub/Sub for Scalability
This project uses Redis' publish/subscribe (pub/sub) system to scale the chat application. Redis ensures that any message sent from one client is broadcast to all active clients, even when multiple instances of the application are running, providing a scalable real-time chat experience.

# Running the Turborepo with npm
Follow these steps to set up and run the Turborepo project using npm:

Clone the Repository \
First, clone the repository to your local machine:

```sh
git clone https://github.com/developingright/Scalable-Chat.git
cd Scalable-Chat
```
Install Dependencies \
Install the required dependencies using npm:
```sh
npm install
```

Build the Project \
To build all apps and packages in the monorepo, run:

```sh
npm run build
```

Start Development Server \
To start the development server for all apps and packages, run:

```sh
npm run dev
```
This will start the development servers for all the apps included in the monorepo.

Access the Apps

Access the web app at http://localhost:3000
Access the docs app at http://localhost:3001
Access the server app at http://localhost:8080
Running Remote Caching (Optional)
If you want to enable remote caching for faster builds across machines, run the following commands after setting up a Vercel account:

```sh
npx turbo login
npx turbo link
```
This will authenticate and link the project to your Vercel account for remote caching.

Enjoy the Project!
You can now start developing and working with the Turborepo setup. All your apps and packages are ready for development!
