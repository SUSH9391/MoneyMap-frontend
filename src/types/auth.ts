export interface User {
    id:string;
    email:string;
    firstName?: string | null;
    lastName?:string | null;
    createdAt?:string;
    updatedAt?:string
}
export interface AuthTokens {
accessToken: string;
refreshToken: string;
}