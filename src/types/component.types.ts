export const Component = {
    Application: Symbol.for('Application'),
    LoggerInterface: Symbol.for('LoggerInterface'),
    ConfigInterface: Symbol.for('ConfigInterface'),
    DatabaseInterface: Symbol.for('DatabaseInterface'),
    UserServiceInterface: Symbol.for('UserServiceInterface'),
    UserModel: Symbol.for('UserModel'),
    RentalOfferServiceInterface: Symbol.for('RentalOfferServiceInterface'),
    RentalOfferModel: Symbol.for('RentalOfferModel')
} as const;