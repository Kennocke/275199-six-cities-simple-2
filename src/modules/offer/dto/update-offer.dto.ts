import { City } from '../../../types/city.type.js';
import { Facilities } from '../../../types/facilities.enum.js';
import { HouseType } from '../../../types/house-type.enum.js';
import { Coordinate } from '../../../types/coordinate.type.js';
import { UserEntity } from '../../user/user.entity.js';
import { Ref } from '@typegoose/typegoose';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsOptional, IsString, Length, Max, Min, ValidateNested } from 'class-validator';

export default class UpdateOfferDto {
  @IsMongoId({message: 'userId field must be valid an id'})
  public offerId!: string;

  @IsOptional()
  @Length(10, 100, {message: 'Title length must be between 10 and 100'})
  public title?: string;

  @IsOptional()
  @Length(10, 100, {message: 'Description length must be between 10 and 100'})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate?: Date;

  @IsOptional()
  public city?: City;

  @IsString({message: 'Preview image is required'})
  public previewImagePath?: string;

  @IsOptional()
  @IsArray({message: 'Images must be array'})
  @ArrayMinSize(6, {message: 'Minimum must be 6 picture'})
  @ArrayMaxSize(6, {message: 'Maximum must be 6 picture'})
  public imagePaths?: string[];

  @IsOptional()
  @IsBoolean({message: 'Premium must be boolean'})
  public premium?: boolean;

  @IsOptional()
  @Min(1, {message: 'Minimum rating must be 1'})
  @Max(5, {message: 'Maximum rating must be 5'})
  public rating?: number;

  @IsOptional()
  @IsEnum(HouseType, {message: 'House type must be specific value'})
  public houseType?: HouseType;

  @IsOptional()
  @IsInt({message: 'roomAmount must be integer'})
  @Min(1, {message: 'Minimum roomAmount must be 1'})
  @Max(8, {message: 'Maximum roomAmount must be 8'})
  public roomAmount?: number;

  @IsOptional()
  @IsInt({message: 'guestAmount must be integer'})
  @Min(1, {message: 'Minimum guestAmount must be 1'})
  @Max(10, {message: 'Maximum guestAmount must be 10'})
  public guestAmount?: number;

  @IsOptional()
  @Min(100, {message: 'Minimum price must be 100'})
  @Max(100000, {message: 'Maximum price must be 100 000'})
  public price?: number;

  @IsOptional()
  @IsArray({message: 'facilities must be an array'})
  @IsEnum(Facilities, {message: 'Facilities must be specific value', each: true})
  public facilities?: Facilities[];

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId?: Ref<UserEntity>;

  @IsOptional()
  @ValidateNested({message: 'Coordinate must be specific format'})
  public coordinate?: Coordinate;
}
