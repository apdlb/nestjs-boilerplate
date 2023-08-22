
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface SignInInput {
    email: string;
    password: string;
}

export interface CreateUserInput {
    email: string;
    password: string;
    firstName: string;
}

export interface UpdateUserInput {
    id: string;
    firstName: string;
}

export interface AuthType {
    __typename?: 'AuthType';
    ok: boolean;
    accessToken: string;
}

export interface IMutation {
    __typename?: 'IMutation';
    signIn(input: SignInInput): AuthType | Promise<AuthType>;
    createUser(input: CreateUserInput): UserType | Promise<UserType>;
    updateUser(input: UpdateUserInput): UserType | Promise<UserType>;
    removeUser(id: string): UserType | Promise<UserType>;
}

export interface UserType {
    __typename?: 'UserType';
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface IQuery {
    __typename?: 'IQuery';
    me(): UserType | Promise<UserType>;
    users(): UserType[] | Promise<UserType[]>;
    user(id: string): UserType | Promise<UserType>;
}

type Nullable<T> = T | null;
