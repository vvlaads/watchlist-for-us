export interface User {
    uuid: string;
    username: string;
    role: 'USER' | 'MODERATOR';
}