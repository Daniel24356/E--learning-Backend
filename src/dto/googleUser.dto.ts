// import { Role } from "@prisma/client";
import {IsEmail, IsEnum, IsNotEmpty, IsOptional, Length} from "class-validator"

export class GoogleUserDTO {
    @IsNotEmpty()
    @Length(2, 50)
    name!: string;
      
    @IsNotEmpty()
    @Length(2, 50)
    avatarUrl!: string;
     
    @IsEmail()
    email!: string;

}