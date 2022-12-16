import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationNotFound } from "./errors/notification-not-found";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { Injectable } from '@nestjs/common';

interface ReadNotificationRequest {
    notificationId: string;
}

type ReadNotificationResponse = void;


@Injectable()
export class ReadNotification {
    constructor(private notificationsRepository: NotificationsRepository){}

    async execute(request: ReadNotificationRequest): Promise<ReadNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findById(notificationId);

        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.read();

        await this.notificationsRepository.save(notification);
    }
}