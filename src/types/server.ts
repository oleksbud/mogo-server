export interface ServerConfig {
    protocol: 'http' | 'https';
    host: string;
    port: number;
}

export interface CookieConfig {
    path: string;
    httpOnly: boolean,
    maxAge: any
}

export interface SessionConfig {
    secret: string;
    name: string;
    cookie: CookieConfig;
}

export interface JsonErrorItem {
    code: number;
    message: string;
}

export interface JsonError {
    error: JsonErrorItem;
}

export interface ErrorFieldValidation {
    field: string;
    reason: string;
}

export interface ValidationResult {
    data: any;
    statusCode: number;
    errors: ErrorFieldValidation[] | null;
}

export type CallbackFunction = (error: any, value: any) => void;
