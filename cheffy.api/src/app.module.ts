import { Module } from '@nestjs/common';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { MacronutrientsModule } from './infrastructure/features/macronutrients/macronutrients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GroceryModule } from './infrastructure/features/grocery/grocery.module';
import { CategoryModule } from './infrastructure/features/category/category.module';
import typeorm from './infrastructure/config/typeorm.config';

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
    LoggerModule,
    ExceptionsModule,
    MacronutrientsModule,
    GroceryModule,
    CategoryModule,
  ],
})
export class AppModule {}
