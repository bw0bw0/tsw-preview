export type ScriptKind = "class" | "enum";

export interface ScriptDeclaration {
    kind: ScriptKind;
    name: string;
    genericParameters: string[];
    extendsName?: string;
    members: MemberDeclaration[];
    sourcePath: string;
}

export type MemberDeclaration =
    | PropertyDeclaration
    | MethodDeclaration
    | ConstructorDeclaration
    | EnumMemberDeclaration;

export interface PropertyDeclaration {
    kind: "property";
    name: string;
    type: string;
    readonly: boolean;
    static: boolean;
}

export interface MethodDeclaration {
    kind: "method";
    name: string;
    returnType: string;
    parameters: ParameterDeclaration[];
    static: boolean;
}

export interface ConstructorDeclaration {
    kind: "constructor";
    parameters: ParameterDeclaration[];
}

export interface EnumMemberDeclaration {
    kind: "enum-member";
    name: string;
    value: string;
}

export interface ParameterDeclaration {
    name: string;
    type: string;
    optional: boolean;
    rest: boolean;
}
