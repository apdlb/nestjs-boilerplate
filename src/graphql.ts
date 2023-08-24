
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum RoleEnum {
    ADMIN = "ADMIN",
    USER = "USER"
}

export class SignInInput {
    email: string;
    password: string;
}

export class CreateUserInput {
    email: string;
    password: string;
    firstName: string;
}

export class UpdateUserInput {
    id: string;
    firstName: string;
    lastName?: Nullable<string>;
}

export class AuthType {
    __typename?: 'AuthType';
    ok: boolean;
    accessToken: string;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract signIn(input: SignInInput): AuthType | Promise<AuthType>;

    abstract createUser(input: CreateUserInput): UserType | Promise<UserType>;

    abstract updateUser(input: UpdateUserInput): UserType | Promise<UserType>;

    abstract removeUser(id: string): UserType | Promise<UserType>;
}

export class UserType {
    __typename?: 'UserType';
    id: string;
    email: string;
    role: RoleEnum;
    firstName: string;
    lastName?: Nullable<string>;
    createdAt: Date;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract users(): UserType[] | Promise<UserType[]>;

    abstract user(id: string): UserType | Promise<UserType>;

    abstract me(): UserType | Promise<UserType>;
}

type Nullable<T> = T | null;
