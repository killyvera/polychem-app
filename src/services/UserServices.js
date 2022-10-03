import {
    CognitoIdentityProviderClient,
    AdminCreateUserCommand,
    AdminUpdateUserAttributesCommand,
    AdminDeleteUserCommand,
    ListUsersCommand,
    AdminGetUserCommand
} from "@aws-sdk/client-cognito-identity-provider";
import { Profiler } from "react";

import { adminCredentials, userPoolID } from "../constants/AdminConfig";

const client = new CognitoIdentityProviderClient(adminCredentials);

export function createUser(phone, email, name, perfil, puesto, departamento) { //CREATE USER COGNITO
    const newUserData = {
        UserPoolId: userPoolID,
        Username: perfil == 'Administrador' && 'administrador'? email : phone,
        DesiredDeliveryMediums: [
            'SMS', 'EMAIL'
        ],
        TemporaryPassword: 'Pass@123',
        UserAttributes: [
            {
                Name: 'phone_number',
                Value: phone
            },
            {
                Name: 'email',
                Value: email
            },
            {
                Name: 'name',
                Value: name
            },
            {
                Name: 'profile',
                Value: perfil
            },
            {
                Name: 'custom:puesto',
                Value: puesto
            },
            {
                Name: 'custom:departamento',
                Value: departamento
            }
        ]

    }
    const command = new AdminCreateUserCommand(newUserData);
    return (
        client.send(command)
            .then(res => res)
            .catch(function (err) {
                console.log(err.message);
            })
    )
}

export function deleteUser(username) { // DELETE USER COGNITO

    const input = {
        UserPoolId: userPoolID,
        Username: username
    }
    const command = new AdminDeleteUserCommand(input);
    return (
        client.send(command)
            .then(res => res.User)
            .catch(function (err) {
                console.log(err.message);
            })
    )
}

export function editUser(userId, phone, email, name, perfil, puesto, departamento) { //CREATE USER COGNITO
    const UserData = {
        UserPoolId: userPoolID,
        Username: userId,
        UserAttributes: [
            {
                Name: 'phone_number',
                Value: phone
            },
            {
                Name: 'email',
                Value: email
            },
            {
                Name: 'name',
                Value: name
            },
            {
                Name: 'profile',
                Value: perfil
            },
            {
                Name: 'custom:puesto',
                Value: puesto
            },
            {
                Name: 'custom:departamento',
                Value: departamento
            }
        ]
    }
    const command = new AdminUpdateUserAttributesCommand(UserData);
    return (
        client.send(command)
            .then(res => res)
            .catch(function (err) {
                console.log(err.message);
            })
    )
}

export function getUser(userId) {
    const UserData = {
        UserPoolId: userPoolID,
        Username: userId
    }
    const command = new AdminGetUserCommand(UserData);
    return (
        client.send(command)
            .then(res => res)
            .catch(function (err) {
                console.log(err.message);
            })
    )
}

export function usersList() {

    const input = {
        UserPoolId: userPoolID,
        AttributesToGet: ['email', 'name', 'phone_number', 'profile']
    }
    const client = new CognitoIdentityProviderClient(adminCredentials);
    const command = new ListUsersCommand(input)
    return (
        client.send(command)
            .then(res => res.Users)
            .catch(function (err) {
                console.log(err.message)
            }
            )
    )
}
