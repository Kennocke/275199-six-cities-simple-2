import { City } from '../../../types/city.type.js';
import { Facilities } from '../../../types/facilities.enum.js';
import { HouseType } from '../../../types/house-type.enum.js';
import { User } from '../../../types/user.type.js';

export default class CreateRentalOfferDto {
    public name!: string;
    public description!: string;
    public postDate!: Date;
    public city!: City;
    public previewImage!: string;
    public images!: string[];
    public premium!: boolean;
    public rating!: number;
    public houseType!: HouseType;
    public roomAmount!: number;
    public guestAmount!: number;
    public price!: number;
    public facilities!: Facilities[];
    public author!: User;
    public commentsAmount!: number;
    public coordinate!: {
      latitude: number;
      longitude: number;
    }
}