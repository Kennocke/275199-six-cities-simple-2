import { Expose } from 'class-transformer';
import { Ref } from '@typegoose/typegoose';
import { City } from '../../../types/city.type.js';
import { Facilities } from '../../../types/facilities.enum.js';
import { HouseType } from '../../../types/house-type.enum.js';
import { Coordinate } from '../../../types/coordinate.type.js';
import { UserEntity } from '../../user/user.entity.js';

export default class DetailOfferResponse {
    @Expose()
    public title!: string;

    @Expose()
    public description!: string;

    @Expose()
    public postDate!: Date;

    @Expose()
    public city!: City;

    @Expose()
    public previewImagePath!: string;

    @Expose()
    public imagePaths!: string[];

    @Expose()
    public premium!: boolean;

    @Expose()
    public rating!: number;

    @Expose()
    public houseType!: HouseType;

    @Expose()
    public roomAmount!: number;

    @Expose()
    public guestAmount!: number;

    @Expose()
    public price!: number;

    @Expose()
    public facilities!: Facilities[];

    @Expose()
    public userId!: Ref<UserEntity>;

    @Expose()
    public coordinate!: Coordinate;
}