import { NextFunction, Request, Response } from 'express';
import { OfferExistsInterface } from '../../types/offer-exists.interface.js';
import { MiddlewareInterface } from '../../types/middleware.interface.js';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';


export class OfferExistsMiddleware implements MiddlewareInterface {
    constructor (
        private readonly service: OfferExistsInterface,
        private readonly entityName: string,
        private readonly paramName: string
    ) {}

    public async execute({params}: Request, _res: Response, next: NextFunction) {
        const offerId = params[this.paramName];

        if(! await this.service.exists(offerId)) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `${this.entityName} with ${offerId} not found.`,
                'OfferExistsMiddleware'
            )
        }

        next();
    }

}