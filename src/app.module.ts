import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
const DB_URL =  process.env.DB_URL || 'mongodb://localhost/forest-api';
@Module({
  imports: [MongooseModule.forRoot(DB_URL), CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
