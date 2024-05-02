export interface ItemProps {
    color?: string;
    type?: string;
    title?: string;
    children?: any;
    id?: string;
    value?: string;
    bold?: boolean;
    underline?: boolean;
    variableType?: string;
    text?: string;
    parentType?: string;
    childNumber?: number;
    mentionsMap : {
        [key: string]: JSX.Element;
    };
}