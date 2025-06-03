import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send-teams-message')
  @HttpCode(201)
  async sendTeamsMessage(
    @Body() body: { message: string },
  ): Promise<{ message: string }> {
    try {
      const response = await this.appService.sendTeamsMessage(body.message);
      return { message: response };
    } catch (error: any) {
      const message: string =
        error instanceof Error
          ? error.message
          : 'Failed to send message to Teams';
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
