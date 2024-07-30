//comments
export interface IDesignerComment {
    avatar: string
    username: string
    thumbnails: { avatar: string }
}

export interface IComment {
    id: number;
    text: string;
    date_created: string
    designer: IDesignerComment
    issue: string
    message: string
}

export interface ICommentsState {
    status: "loading" | "resolved" | "rejected" | null;
    comments: IComment[];
    error: string | null;
}


//designers
export interface IIssueTypes {
    date_created: string
    date_finished_by_designer: string
    date_started_by_designer: string
    id: number
    key: string
    status: string
}

export interface IDesignerItem {
    avatar: string
    email: string
    issues: IIssueTypes[]
    thumbnails: {avatar: string }
    username: string
}

export interface IDesignerResponse {
    count: number
    next: string
    previous: null
    results: IDesignerItem[]
}

export interface IFiltersDesigners {
    key?: string | null
    status?: string | null
    page?: number
    limit: number
}


export interface IDesignersState {
    status: "loading" | "resolved" | "rejected" | null;
    designers: IDesignerResponse | null;
    filter: IFiltersDesigners
    sortBy: string | null,
    error: string | null;
}


//tasks

export interface ITask{
    "id": number,
    "status": string,
    "designer": string,
    "project": string,
    "date_created": string,
    "summary": string,
    "received_from_client": number,
    "send_to_project_manager": number,
    "send_to_account_manager": number,
    "send_to_designer": number,
    "date_updated": string,
    "date_started_by_designer": string,
    "date_finished_by_designer": string,
    "date_finished": string
}

export interface ITasksState {
    status: "loading" | "resolved" | "rejected" | null;
    tasks: ITask[];
    error: string | null;
}
