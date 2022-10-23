import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';
import { City } from '../../types/city.type.js';
import { Facilities } from '../../types/facilities.enum.js';
import { HouseType } from '../../types/house-type.enum.js';
import { Offer } from '../../types/offer.type.js';
import { User } from '../../types/user.type.js';
import { Coordinate } from '../../types/coordinate.type.js';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface RentalOfferEntity extends defaultClasses.Base {}

@modelOptions({
    schemaOptions: {
        collection: 'rental-offer'
    }
})
export class RentalOfferEntity extends defaultClasses.TimeStamps {
    @prop({required: true, default: ''})
    public name!: string;

    @prop({required: true, trim: true})
    public description!: string;

    @prop({required: true, default: new Date()})
    public postDate!: Date;

    @prop({required: true, default: ''})
    public city!: City;

    @prop({required: true, default: ''})
    public previewImage!: string;

    @prop({required: true, default: []})
    public images!: string[];

    @prop({required: true, default: false})
    public premium!: boolean;

    @prop({required: true, default: 0})
    public rating!: number;

    @prop({
        required: true,
        type: () => String,
        enum: HouseType
    })
    public houseType!: HouseType;

    @prop({required: true, default: 0})
    public roomAmount!: number;

    @prop({required: true, default: 0})
    public guestAmount!: number;

    @prop({required: true, default: 0})
    public price!: number;

    @prop({required: true, default: ''})
    public facilities!: Facilities[];

    @prop({
        ref: UserEntity,
        required: true,
        default: 
    })
    public author!: Ref<UserEntity>;

    @prop({required: true, default: 0})
    public commentsAmount!: number;

    @prop({required: true, default: {}})
    public coordinate!: Coordinate;
}

export const RentalOfferModel = getModelForClass(RentalOfferEntity);