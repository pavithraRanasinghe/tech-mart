export enum userStatus {
  authenticated,
  pending,
  registration_required
}

export class User {
    username?: string;
    email?: string;
    contactNo?: bigint;
    address?: string;
    registered = false;
    loggedIn = false;
    userType?: string;
    userId: number;
    id: number;

    autoStartToken?: string;
    jwtToken?: string;

    sessionId?: string;
    status: userStatus;
    name?: string;
}
