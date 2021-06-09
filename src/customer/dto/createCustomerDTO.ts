import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
    @ApiProperty()
    phoneNumber : String;
    @ApiProperty()
    email : String;
    @ApiProperty()
    firstName : String;
    @ApiProperty()
    lastName : String;
    @ApiProperty()
    dateOfBirth : String;
    @ApiProperty()
    address : String;
    @ApiProperty()
    countryId : Number;
    @ApiProperty()
    password : string;
    @ApiProperty()
    role : String;
}