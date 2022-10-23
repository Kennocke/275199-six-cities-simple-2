import {DocumentType} from '@typegoose/typegoose';
import CreateRentalOfferDto from './dto/create-rental-offer.dto.js';
import { RentalOfferEntity } from './rental-offer.entity.js';

export interface RentalOfferServiceInterface {
    create(dto: CreateRentalOfferDto, salt: string): Promise<DocumentType<RentalOfferEntity>>;
    findById(rentalOfferId: string):Promise<DocumentType<RentalOfferEntity> | null>;
}