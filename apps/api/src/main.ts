import { NestFactory } from "@nestjs/core";
import { ConsoleLogger, HttpStatus, ValidationPipe, VersioningType } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { RootModule } from "./root.module";
import cookieParser from "cookie-parser";
import { GlobalValidationPipe } from "./global-validation.pipe";
import { ValidationError } from "class-validator";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(RootModule, {
    rawBody: true
  });

  app.enableVersioning({
    defaultVersion: "1",
    type: VersioningType.URI,
  });

  // set express settings and middleware
  app.enableCors();
  // @see https://expressjs.com/en/guide/behind-proxies.html
  app.set("trust proxy", ["loopback", "linklocal", "uniquelocal", "::1", "127.0.0.1"]);
  app.use(cookieParser());
  /*app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const mappedErrors = errors.reduce((acc: { [key: string]: any }, item) => {
          acc[item.property] = Object.values(item.constraints || {});
          return acc;
        }, {});

        return new Error(
          "Invalid data received for parameters: " + Object.keys(mappedErrors).join(", ")
        );
      }
    }),
  );*/
  app.enableShutdownHooks();

  const port = process.env.PORT || process.env.NODE_PORT || 3000;
  await app.listen(port, "127.0.0.1");

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}

bootstrap();
