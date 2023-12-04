export interface NotificationsModel {
    id: number;
    emisor: { name: string; email: string; };
    message: string;
    date: string;
}