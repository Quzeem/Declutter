import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryAddressDto } from './create-delivery-address.dto';

// PartialType(CreateDeliveryAddressDto) create a new DTO that inherits from CreateDeliveryAddressDto but with all of its properties set to optional.
export class UpdateDeliveryAddressDto extends PartialType(
  CreateDeliveryAddressDto,
) {}
