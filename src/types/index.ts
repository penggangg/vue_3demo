declare interface HttpResponse {
    code?: number;
    message?: string;
    subCode?: number;
    subMessage?: string;
    timestamp?: number;
    data?: {
        [key: string]: any;
    };
}
