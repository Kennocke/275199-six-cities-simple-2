import { Length, IsDateString, IsArray, ArrayMinSize, ArrayMaxSize, IsBoolean, Min, Max, IsEnum, IsInt, ValidateNested, IsString} from 'class-validator';
import { City } from '../../../types/city.type.js';
import { Facilities } from '../../../types/facilities.enum.js';
import { HouseType } from '../../../types/house-type.enum.js';
import { Coordinate } from '../../../types/coordinate.type.js';

export default class CreateOfferDto {
  @Length(10, 100, {message: 'Title length must be between 10 and 100'})
  public title!: string;

  @Length(10, 100, {message: 'Description length must be between 10 and 100'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate!: Date;

  public city!: City;

  @IsString({message: 'Preview image is required'})
  public previewImagePath!: string;

  @IsArray({message: 'Images must be array'})
  @ArrayMinSize(6, {message: 'Minimum must be 6 picture'})
  @ArrayMaxSize(6, {message: 'Maximum must be 6 picture'})
  public imagePaths!: string[];

  @IsBoolean({message: 'Premium must be boolean'})
  public premium!: boolean;

  @Min(1, {message: 'Minimum rating must be 1'})
  @Max(5, {message: 'Maximum rating must be 5'})
  public rating!: number;

  @IsEnum(HouseType, {message: 'House type must be specific value'})
  public houseType!: HouseType;

  @IsInt({message: 'roomAmount must be integer'})
  @Min(1, {message: 'Minimum roomAmount must be 1'})
  @Max(8, {message: 'Maximum roomAmount must be 8'})
  public roomAmount!: number;

  @IsInt({message: 'guestAmount must be integer'})
  @Min(1, {message: 'Minimum guestAmount must be 1'})
  @Max(10, {message: 'Maximum guestAmount must be 10'})
  public guestAmount!: number;

  @Min(100, {message: 'Minimum price must be 100'})
  @Max(100000, {message: 'Maximum price must be 100 000'})
  public price!: number;

  @IsArray({message: 'facilities must be an array'})
  @IsEnum(Facilities, {message: 'Facilities must be specific value', each: true})
  public facilities!: Facilities[];

  public userId!: string;

  @ValidateNested({message: 'Coordinate must be specific format'})
  public coordinate!: Coordinate;
}
