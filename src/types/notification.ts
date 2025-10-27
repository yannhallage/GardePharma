export interface INotification {
    message: string;
    date: string; // ou Date si tu la convertis après réception
}

export interface IGetAllNotificationsResponse {
    success: boolean;
    message: string;
    data: INotification[];
}
