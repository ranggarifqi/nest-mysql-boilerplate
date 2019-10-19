import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CrudConfigService } from '@nestjsx/crud';
import { AllowedRoles } from './roles/decorators/roles.decorator';

// Default config for Nest CRUD
// Untuk create, update, dan delete akan di coding custom.
// Karena use case nya luas. Cth: fungsi delete terkadang maksudnya adalah "Soft Delete", dll
// Sehingga harus di coding sendiri
CrudConfigService.load({
  query: {
    limit: 25,
    cache: 2000,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
    getManyBase: {
      decorators: [
        AllowedRoles('superadmin', 'admin')
      ]
    },
    getOneBase: {
      decorators: [
        AllowedRoles('superadmin', 'admin')
      ]
    }
  },
});

import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle('API Explorer')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('notes')
    .addTag('roles')
    .addTag('users')
    .addBearerAuth('Authorization', 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
