import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { DeliveryAddress } from './entities/delivery-address.entity';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address.dto';
import { NextOfKin } from './entities/next-of-kin.entity';
import { UpdateDeliveryAddressDto } from './dto/update-delivery-address.dto';
// import { QueryService } from '../../common/utils/apiFeatures';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(DeliveryAddress)
    private addressesRepository: Repository<DeliveryAddress>,
    @InjectRepository(NextOfKin)
    private nextOfKinRepository: Repository<NextOfKin>,
    // private readonly queryService: QueryService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    const user = this.usersRepository.create(createUserDto);

    const token = user.generateEmailVerificationToken();

    await this.usersRepository.save(user);

    return { user, token };
  }

  findOneByEmail(email: string): null | Promise<User> {
    if (!email) return null;

    return this.usersRepository.findOneBy({ email });

    // Not working for data association - Does loading an entity's relations prevent the entity association with another entity?
    // return this.usersRepository.findOne({
    //   where: { email },
    //   relations: { deliveryAddresses: true, defaultDeliveryAddress: true },
    // });
  }

  async addDeliveryAddress(
    user: User,
    addressData: CreateDeliveryAddressDto,
  ): Promise<DeliveryAddress> {
    const address = this.addressesRepository.create({ ...addressData, user });
    await this.addressesRepository.save(address);

    if (addressData.saveAsDefault) user.defaultDeliveryAddress = address;
    await this.usersRepository.save(user);

    delete address.user;
    return address;
  }

  getDeliveryAddresses(user: User): Promise<DeliveryAddress[]> {
    return this.addressesRepository.find({
      where: { userId: user.id },
      order: { createdAt: 'DESC' },
      // select: {
      //   address: true,
      //   landmarkArea: true,
      //   user: { id: true, firstName: true, lastName: true },
      // },
      // relations: { user: true },
      // skip: 0,
      // take: 1,
    });
  }

  // // Practice
  // getDeliveryAddresses(user: User): Promise<DeliveryAddress[]> {
  //   return this.queryService.findAll(
  //     this.addressesRepository,
  //     {
  //       landmarkArea: 'Fadeyi',
  //       sort: 'createdAt:DESC, id: ASC',
  //       fields: 'address, landmarkArea',
  //       page: 1,
  //       limit: 10,
  //     },
  //     { userId: user.id },
  //   );
  // }

  async updateDeliveryAddress(
    addressId: number,
    user: User,
    changes: UpdateDeliveryAddressDto,
  ) {
    // const result = await this.addressesRepository.update(
    //   { id: addressId, userId: user.id },
    //   changes,
    // );

    // if (result.affected === 0) throw new NotFoundException('Address not found');

    const address = await this.addressesRepository.findOne({
      where: { id: addressId, userId: user.id },
    });

    if (!address) throw new NotFoundException('Address not found');

    Object.assign(address, changes);
    return this.addressesRepository.save(address);

    // return this.addressesRepository.save({ ...address, ...changes });
  }

  async setDefaultDeliveryAddress(addressId: number, user: User) {
    const address = await this.addressesRepository.findOne({
      where: { id: addressId, userId: user.id },
    });

    if (!address) throw new NotFoundException('Address not found');

    user.defaultDeliveryAddress = address;
    await this.usersRepository.save(user);
  }

  async deleteDeliveryAddress(addressId: number, user: User) {
    const result = await this.addressesRepository.delete({
      id: addressId,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Address not found');
    }

    // const address = await this.addressesRepository.findOne({
    //   where: { id: addressId, userId: user.id },
    // });

    // if (!address) throw new NotFoundException('Address not found');

    // return this.addressesRepository.remove(address);
  }

  async softDeleteUser(user: User) {
    await this.usersRepository.softDelete(user.id);
  }

  async restoreUser(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      withDeleted: true,
    });

    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.restore(user.id);
  }

  async addNextOfKin(user: User): Promise<NextOfKin> {
    const nextOfKin = this.nextOfKinRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      phoneNumber: '2348163113601',
      address: 'Somewhere on earth',
    });

    nextOfKin.user = user;
    await this.nextOfKinRepository.save(nextOfKin);

    delete nextOfKin.user;
    return nextOfKin;
  }
}
