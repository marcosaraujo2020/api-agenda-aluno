import { IsUUID, IsDate } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  taskId: string;

  @IsDate()
  notify_in: Date;
}
