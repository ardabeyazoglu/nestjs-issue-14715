import { IsNotEmpty } from "class-validator";

export class WebhookDto {
    @IsNotEmpty()
    public name: string;
  
    constructor(args: WebhookDto) {
      // args is undefined, therefore the controller method never receive the dto object
      console.debug("args", args);
      this.name = args.name;
    }
  }