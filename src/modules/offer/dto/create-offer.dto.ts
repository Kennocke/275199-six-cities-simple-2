import { Ref } from '@typegoose/typegoose/lib/types.js';
import { City } from '../../../types/city.type.js';
import { Facilities } from '../../../types/facilities.enum.js';
import { HouseType } from '../../../types/house-type.enum.js';
import { Coordinate } from '../../../types/coordinate.type.js';
import { UserEntity } from '../../user/user.entity.js';

export default class CreateOfferDto {
    public title!: string;
    public description!: string;
    public postDate!: Date;
    public city!: City;
    public previewImagePath!: string;
    public imagePaths!: string[];
    public premium!: boolean;
    public rating!: number;
    public houseType!: HouseType;
    public roomAmount!: number;
    public guestAmount!: number;
    public price!: number;
    public facilities!: Facilities[];
    public userId!: Ref<UserEntity>;
    public coordinate!: Coordinate;
}