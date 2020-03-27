export interface APIData <T= unknown> {
    data: T;
    error?: {
        message: string;
        code?: number;
        errors?: string[];
    };
}