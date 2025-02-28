import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class WebhookDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public signing_key?: string;
  
  @IsOptional()
  @IsString()
  public signature_param?: string;

  constructor(args: WebhookDto) {
    console.debug("dto args", args);
    this.name = args.name;
    this.signing_key = args.signing_key;
    this.signature_param = args.signature_param;
  }
}
