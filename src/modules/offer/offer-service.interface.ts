import { DocumentType } from '@typegoose/typegoose';
import { OfferExistsInterface } from '../../types/offer-exists.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { OfferEntity } from './offer.entity.js';

export interface OfferServiceInterface extends OfferExistsInterface {
    create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
    findById(rentalOfferId: string):Promise<DocumentType<OfferEntity> | null>;
    find(limit?: number):Promise<DocumentType<OfferEntity>[]>;
    deleteById(offerId: string):Promise<DocumentType<OfferEntity> | null>;
    updateById(offerId: string, dto: UpdateOfferDto):Promise<DocumentType<OfferEntity> | null>;
    findDetail(offerId: string): Promise<DocumentType<OfferEntity> | null>;
    exists(documentId: string): Promise<boolean>;
    // incCommentCount(offerId: string):Promise<DocumentType<OfferEntity> | null>;
}
