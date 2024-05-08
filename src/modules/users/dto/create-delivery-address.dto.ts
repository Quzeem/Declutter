import { IsBoolean, IsString, Matches } from 'class-validator';

export class CreateDeliveryAddressDto {
  @IsString()
  address: string;

  @IsString()
  landmarkArea: string;

  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone number must be in international format',
  })
  phoneNumber: string;

  @IsBoolean()
  saveAsDefault: boolean;
}
