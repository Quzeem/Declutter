import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { DeliveryAddress } from './entities/delivery-address.entity';
import { NextOfKin } from './entities/next-of-kin.entity';
// import { QueryService } from '../../common/utils/apiFeatures';

@Module({
  imports: [TypeOrmModule.forFeature([User, DeliveryAddress, NextOfKin])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
