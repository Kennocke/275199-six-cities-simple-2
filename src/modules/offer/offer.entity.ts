import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';
import { City } from '../../types/city.type.js';
import { Facilities } from '../../types/facilities.enum.js';
import { HouseType } from '../../types/house-type.enum.js';
import { Coordinate } from '../../types/coordinate.type.js';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({required: true})
  public title!: string;

  @prop({required: true, trim: true})
  public description!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({required: true})
  public city!: City;

  @prop({required: true})
  public previewImagePath!: string;

  @prop({required: true})
  public imagePaths!: string[];

  @prop({required: true})
  public premium!: boolean;

  @prop({required: true})
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: HouseType
  })
  public houseType!: HouseType;

  @prop({required: true})
  public roomAmount!: number;

  @prop({required: true})
  public guestAmount!: number;

  @prop({required: true})
  public price!: number;

  @prop({required: true})
  public facilities!: Facilities[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({required: true})
  public coordinate!: Coordinate;
}

export const OfferModel = getModelForClass(OfferEntity);
