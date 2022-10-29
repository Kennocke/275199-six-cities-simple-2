import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { OfferEntity } from './offer.entity.js';

export interface OfferServiceInterface {
    create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
    findById(rentalOfferId: string):Promise<DocumentType<OfferEntity> | null>;
    find():Promise<DocumentType<OfferEntity>[]>;
    deleteById(offerId: string):Promise<DocumentType<OfferEntity> | null>;
    updateById(offerId: string, dto: UpdateOfferDto):Promise<DocumentType<OfferEntity> | null>;
    findDetail(offerId: string): Promise<DocumentType<OfferEntity> | null>;
    // incCommentCount(offerId: string):Promise<DocumentType<OfferEntity> | null>;
}