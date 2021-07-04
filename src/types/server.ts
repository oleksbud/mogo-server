export interface ServerConfig {
    protocol: 'http' | 'https';
    host: string;
    port: number;
}

export interface JsonErrorItem {
    code: number;
    message: string;
}

export interface JsonError {
    error: JsonErrorItem;
}
