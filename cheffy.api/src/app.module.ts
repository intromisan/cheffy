import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { MacronutrientsModule } from './infrastructure/features/macronutrients/macronutrients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GroceryModule } from './infrastructure/features/grocery/grocery.module';
import { CategoryModule } from './infrastructure/features/category/category.module';
import { ProfileModule } from './infrastructure/features/profile/profile.module';
import { FridgeModule } from './infrastructure/features/fridge/fridge.module';
import { FirebaseModule } from './infrastructure/auth/firebase/firebase.module';
import typeorm from './infrastructure/config/typeorm.config';
import { AuthModule } from './infrastructure/auth/auth.module';
import { AuthMiddleware } from './infrastructure/auth/middlewares/auth.middleware';
import { ProfileMiddleware } from './infrastructure/auth/middlewares/profile.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    AuthModule,
    LoggerModule,
    ExceptionsModule,
    MacronutrientsModule,
    GroceryModule,
    CategoryModule,
    ProfileModule,
    FridgeModule,
    FirebaseModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer
      .apply(ProfileMiddleware)
      .forRoutes(
        { path: '*/fridges', method: RequestMethod.PUT },
        { path: '*/fridges', method: RequestMethod.POST },
      );
  }
}
