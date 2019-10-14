import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeder.module';
import { Logger } from '@nestjs/common';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);
  try {
    const logger = appContext.get(Logger);
    const seederService = appContext.get(SeederService);

    const seedRes = await seederService.seedAll();
    logger.log(seedRes);
  } catch (error) {
    throw error;
  } finally {
    appContext.close();
  }
}
bootstrap();