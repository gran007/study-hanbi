export class CreateSubTaskDto {
    
    userId: number;
    readonly projectId: number;
    readonly taskId: number;
    readonly priority: number;
    readonly orderNo: number;
    readonly name: string;
}
