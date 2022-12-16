import { NotificationsRepository } from "../repositories/notifications-repository";
import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';

interface CountRecipientNotificationsRequest {
    recipientId: string;
}

interface CountRecipientNotificationsResponse {
    count: number
}

@Injectable()
export class CountRecipientNotifications {
    constructor(private notificationsRepository: NotificationsRepository){}

    async execute(request: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse> {
        const { recipientId } = request;
        const count = await this.notificationsRepository.countManyByRecipientId(recipientId);

        return {count};
    }
}