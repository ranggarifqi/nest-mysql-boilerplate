import { Module } from '@nestjs/common';
import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('SMTP_SERVICE_HOST'),
          port: parseInt(configService.get('SMTP_SERVICE_PORT')),
          secure: JSON.parse(configService.get('SMTP_SERVICE_SECURE')),
          auth: {
            user: configService.get('SMTP_USER_NAME'),
            pass: configService.get('SMTP_USER_PASSWORD'),
          }
        },
        defaults: {
          from: `"Nest MySQL Boilerplate" <${configService.get('SMTP_USER_NAME')}>`,
        },
        template: {
          dir: join(__dirname, '..', '..', 'views', 'email'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      })
    })
  ]
})
export class MailModule {}
