import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { WebhookDto } from './webhook.dto';

@Controller("/webhooks")
export class WebhookController {

  @Get()
  read() {
    return 'Hello World!';
  }

  @UsePipes(new ValidationPipe({
    errorHttpStatusCode: 400
  }))
  @Post()
  create(@Body() dto: WebhookDto) {
    // request fails before this point
    console.log('dto', dto);
  }
}
