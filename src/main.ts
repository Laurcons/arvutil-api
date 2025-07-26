import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Trust proxies for proper IP detection
  app.set("trust proxy", true);

  // Configure payload size limits
  app.use((req, res, next) => {
    const contentLength = parseInt(req.headers["content-length"] || "0");
    if (contentLength > 1024 * 1024) {
      // 1MB limit
      return res.status(413).json({
        error: "Payload too large",
        message: "Request payload cannot exceed 1MB",
      });
    }
    next();
  });

  // Enable validation pipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
