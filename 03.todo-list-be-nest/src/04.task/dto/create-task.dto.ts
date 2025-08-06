export class CreateTaskDto {
    
    userId: number;
    readonly projectId: number;
    readonly boardId: number;
    readonly priority: number;
    readonly orderNo: number;
    readonly name: string;
}
