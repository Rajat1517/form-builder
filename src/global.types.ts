export type Validation= {
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

export type Layout= (TextInput|SelectionInput)[];

export type Action= {type: string; payload: TextInput|SelectionInput}

export type Option= {
    value: string;
    content: string;
    id: string;
}

export interface SelectionInput extends Input{
    multiple?: boolean;
    options: Option[];
}