import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { ExcludeUserPropsDto } from './dto/exclude-user-props.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { DeliveryAddress } from './entities/delivery-address.entity';
import { UsersService } from './users.service';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UpdateDeliveryAddressDto } from './dto/update-delivery-address.dto';
import { EmailDto } from '../auth/dto';
import { DeliveryAddressQueryParamsDto } from './dto/get-delivery-addresses.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get('/profile')
  // @UseGuards(AuthGuard)
  // @Serialize(ExcludeUserPropsDto)
  // getProfile(@Request() request) {
  //   return request.user;
  // }

  @Get('/profile')
  @UseGuards(AuthGuard)
  @Serialize(ExcludeUserPropsDto)
  getProfile(@CurrentUser() user: User): User {
    return user;
  }

  @Post('/delivery-addresses')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  addDeliveryAddress(
    @CurrentUser() user: User,
    @Body() addressData: CreateDeliveryAddressDto,
  ) {
    return this.usersService.addDeliveryAddress(user, addressData);
  }

  @Get('/delivery-addresses')
  @UseGuards(AuthGuard)
  getDeliveryAddresses(
    @CurrentUser() user: User,
    @Query() queryParams: DeliveryAddressQueryParamsDto,
  ): Promise<DeliveryAddress[]> {
    return this.usersService.getDeliveryAddresses(user, queryParams);
  }

  @Patch('/delivery-addresses/:addressId')
  @UseGuards(AuthGuard)
  updateDeliveryAddress(
    @Param('addressId', ParseIntPipe) addressId: number,
    @CurrentUser() user: User,
    @Body() changes: UpdateDeliveryAddressDto,
  ) {
    return this.usersService.updateDeliveryAddress(addressId, user, changes);
  }

  @Patch('/delivery-addresses/:addressId/default')
  @UseGuards(AuthGuard)
  setDefaultDeliveryAddress(
    @Param('addressId', ParseIntPipe) addressId: number,
    @CurrentUser() user: User,
  ) {
    return this.usersService.setDefaultDeliveryAddress(addressId, user);
  }

  @Delete('/delivery-addresses/:addressId')
  @UseGuards(AuthGuard)
  deleteDeliveryAddress(
    @Param('addressId', ParseIntPipe) addressId: number,
    @CurrentUser() user: User,
  ) {
    return this.usersService.deleteDeliveryAddress(addressId, user);
  }

  @Post('/next-of-kin')
  @UseGuards(AuthGuard)
  addNextOfKin(@CurrentUser() user: User) {
    return this.usersService.addNextOfKin(user);
  }

  @Delete('/account/soft-delete')
  @UseGuards(AuthGuard)
  softDeleteUser(@CurrentUser() user: User) {
    return this.usersService.softDeleteUser(user);
  }

  @Post('/account/restore')
  @HttpCode(HttpStatus.OK)
  restoreUser(@Body() { email }: EmailDto) {
    return this.usersService.restoreUser(email);
  }
}
