export interface TaskDto {
    id: number;
    projectId: number;
    boardId: number;
    priority: number;
    orderNo: number;
    name: string;
}

export interface BoardDto {
    id: number;
    projectId: number;
    name: string;
    orderNo: number;
    tasks: TaskDto[];
}

export interface SubTaskDto {
    id: number;
    projectId: number;
    taskId: number;
    priority: number;
    orderNo: number;
    name: string;
}