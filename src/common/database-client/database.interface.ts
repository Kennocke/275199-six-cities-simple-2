export interface DatabaseIntreface {
    connect(uri: string): Promise<void>;
    disconnect(): Promise<void>;
}
