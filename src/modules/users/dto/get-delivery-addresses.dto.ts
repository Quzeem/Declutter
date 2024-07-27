import { IsOptional, IsString } from 'class-validator';
import { CustomQueryParamsDto } from '../../../common/dto/custom-query-params.dto';

// DeliveryAddress-specific query parameters (inherits from QueryParamsDto)
export class DeliveryAddressQueryParamsDto extends CustomQueryParamsDto {
  @IsOptional()
  @IsString()
  landmarkArea: string;
}
