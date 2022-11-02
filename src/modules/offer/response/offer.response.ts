import { Expose } from 'class-transformer';
import { City } from '../../../types/city.type.js';
import { HouseType } from '../../../types/house-type.enum.js';

export default class OfferResponse {
  @Expose()
  public price!: number;

  @Expose()
  public title!: string;

  @Expose()
  public houseType!: HouseType;

  @Expose()
  public postDate!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public previewImagePath!: string[];

  @Expose()
  public premium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public commentCount!: number;
}
