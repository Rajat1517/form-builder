export type Validation = {
    num?: {
        min: number;
        max: number;
    };
    text?: {
        contains?: string;
        dontContains?: string;
        regex?: string;
        maxLength?: number;
        minLength?: number;
    };
    date?: {
        min?: Date|null;
        max?: Date|null;
    };

    time?: {
        min?: string;
        max?: string;
    }
}

export interface Input {
    type: string;
    name: string;
    label: string;
    required: boolean;
    index: number;
    status: string;
    id: string;
}

export interface TextInput extends Input {
    validation?: Validation;
}

export type Layout = (TextInput | SelectionInput | RadioInput | DateInput | TimeInput)[];

export type Action = { type: string; payload: TextInput | SelectionInput | RadioInput | DateInput | TimeInput }

export type Option = {
    value: string;
    id: string;
}

export interface SelectionInput extends Input {
    multiple?: boolean;
    options: Option[];
}

export interface RadioInput extends Input {
    options: Option[];
}


export interface DateInput extends Input {
    validation?: Validation;
}

export interface TimeInput extends Input {
    validation?: Validation;
}


export type ModalType = "error" | "submitted";