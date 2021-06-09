import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty()
    phoneNumber: string;
    @ApiProperty()
    email : string;
    @ApiProperty()
    password: string;
}