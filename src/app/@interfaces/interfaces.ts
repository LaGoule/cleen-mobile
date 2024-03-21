export interface iTodo {
    title: string;
    id: string;
    groupId: string;
    completed?: boolean;

    points: number;
    color: string;
    priority: number;
    description: string;
    
    assignatedUsers: iUser[];
    completedBy?: string[];
    
    creationDate: Date;
    isScheduled: boolean;
    dueDate?: Date | null;
    completionDate?: Date;
    repeat: string;
}

export interface iGroup {
    id: string;
    displayName: string;
    admins: string[];
    users: string[];
    creationDate?: Date;
}

export interface iUser {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    inscriptionDate?: Date;

    groups: {
        active: string;
        admin: string[];
        member: string[];
    };

    todos?: {
        pending: iTodo[];
        completed: iTodo[];
    };

    points: number;
}