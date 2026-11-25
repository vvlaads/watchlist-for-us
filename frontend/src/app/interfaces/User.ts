export interface User {
    id: string;
    username: string;
    role: 'USER' | 'MODERATOR';
}