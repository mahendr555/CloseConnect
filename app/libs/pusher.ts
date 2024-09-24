import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

// Create Pusher server instance
export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,  // Your Pusher App ID from the environment variable
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,  // Your Pusher public key (exposed to the client)
  secret: process.env.PUSHER_SECRET!,  // Your Pusher secret (kept on the server)
  cluster: 'ap2',  // Your Pusher cluster
  useTLS: true,  // Ensure secure connections
});

// Create Pusher client instance
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,  // Client-side public key
  {
    cluster: 'ap2',  // Your Pusher cluster
    channelAuthorization: {
      endpoint: '/api/pusher/auth',  // API route for handling Pusher authentication
      transport: 'ajax',  // Type of request
    },
  }
);
