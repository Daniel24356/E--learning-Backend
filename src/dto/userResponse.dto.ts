import { Role } from "@prisma/client";

export class userResponseDTO {
    firstName!: string;
    lastName!: string;
    email!: string;
    role!: Role;
}
// 