import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";

import { WebhookDto } from "./dto/webhook.dto";

@Controller({
  path: "webhooks",
  version: "1"
})
export class WebhookController {
  constructor() {}

  @Get()
  async read() {
    return "hello world";
  }

  @UsePipes(new ValidationPipe({ transform: false }))
  @Post()
  async create(
    @Body() dto: WebhookDto
  ) {
    // Do something with the dto
    return { dto };
  }

}
