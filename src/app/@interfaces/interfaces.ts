export interface iTodo {
    title: string;
    id: string;
    groupId: string;
    completed?: boolean;
    points?: number;
    
    color?: string;
    priority?: number;
    description?: string;
    
    assignatedUsers?: iUser[];
    completedBy?: iUser[];
    
    dueDate?: Date;
    completionDate?: Date;
    repeat?: boolean;
    repeatInterval?: string;
}

export interface iGroup {
    id: string;
    displayName: string;
    admin: iUser;
    users: iUser[];
}

export interface iUser {
    id: string;
    displayName: string;
    email: string;
    photoUrl: string;

    groups: {
        admin: iGroup[];
        member: iGroup[];
    };

    todos: {
        pending: iTodo[];
        completed: iTodo[];
    };

    points: {
        total: number;
        dailyTotal: number;
        weaklyTotal: number;
        monthlyTotal: number;
    };
}