export enum TodoStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

export interface ITodoList {
    id: string;
    description: string;
    status: TodoStatus;
    items?: { 
        id: string;
        description: string;
        status: TodoStatus;
    }[];
}