export interface OfferExistsInterface {
    exists(documentId: string): Promise<boolean>
}