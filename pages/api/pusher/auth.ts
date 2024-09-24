import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { pusherServer } from '@/app/libs/pusher'; // Ensure this path matches your project structure
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Ensure this path matches your project structure

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    // Retrieve the session using NextAuth
    const session = await getServerSession(request, response, authOptions);

    // Check if the session is valid
    if (!session) {
      return response.status(401).json({ message: 'Unauthorized: Session not found' });
    }

    // Check if the email exists in the session
    if (!session.user?.email) {
      return response.status(401).json({ message: 'Unauthorized: Email not found in session' });
    }

    const { socket_id, channel_name } = request.body;

    // Validate the presence of socket_id and channel_name
    if (!socket_id || !channel_name) {
      return response.status(400).json({ message: 'Bad Request: Missing socket_id or channel_name' });
    }

    // Prepare user data for Pusher authorization
    const data = {
      user_id: session.user.email, // Using email as user_id for Pusher
    };

    // Authorize the user for the Pusher channel
    const authResponse = pusherServer.authorizeChannel(socket_id, channel_name, data);

    // Send the authorization response
    return response.status(200).send(authResponse);

  } catch (error) {
    console.error('Authorization Error:', error);
    return response.status(500).json({ message: 'Internal Server Error: Error authorizing channel' });
  }
}
