import { Injectable } from '@nestjs/common';
import { DEFAULT_MESSAGE } from './constants';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async sendTeamsMessage(message: string): Promise<string> {
    try {
      if (!message || message.trim() === '') {
        throw new Error('Message cannot be empty');
      }
      const url = process.env.TEAMS_API_ENDPOINT;
      const token = process.env.TEAMS_API_TOKEN;
      if (!url || !token) {
        throw new Error(
          'TEAMS_API_ENDPOINT or TEAMS_API_TOKEN is not set in environment variables',
        );
      }
      console.log(`Sending message to Teams: ${message}`);
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          ...DEFAULT_MESSAGE,
          content: `<p>${message.replaceAll('\n', '<br />')}</p>`,
        }),
      });
    } catch (error) {
      console.error('Error sending message to Teams:', error);
      throw new Error(
        `Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
    return `Message sent: ${message}`;
  }
}
