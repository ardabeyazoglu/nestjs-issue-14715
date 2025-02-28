import { Module } from "@nestjs/common";
import { WebhookModule } from "./webhook/webhook.module";

@Module({
  controllers: [],
  imports: [
    WebhookModule
  ],
})
export class RootModule {}
