import { Controller,Get, Param, Post, Delete,Query,Body, HttpStatus, HttpException, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { apiResponseBuilder } from 'src/helper/apiHandlers';
import { CustomerService } from './customer.service';
import { CreateUserDTO } from './dto/createCustomerDto';
import { LoginDto } from './dto/loginDto';

/*
  Cutomers API - User Controller
  Auther: Michael Falade
*/


@ApiTags('Customers')
@Controller('customer')
export class CustomerController {

    constructor(private readonly UserService : CustomerService ) {}

    @Get()
    async getUsers(){
        const user = await this.UserService.getCustomers();
        return apiResponseBuilder(user, true, HttpStatus.OK, HttpStatus.OK.toString());
    }

    @Get(':userID')
    async getUser(@Param('userID') userID){
        const user =  await this.UserService.getCustomer(userID);
        return apiResponseBuilder(user, true, HttpStatus.OK, HttpStatus.OK.toString());
    }

    @Post()
    async  addUser(@Body() createUserDTO : CreateUserDTO ){
       const resp =  await this.UserService.addCustomer(createUserDTO);
     //  return {status: true, user: resp, statusCode: HttpStatus.CREATED, message : 'user created successfully!' };
       return apiResponseBuilder(resp, true, HttpStatus.CREATED, HttpStatus.CREATED.toString());
    }

    @Put(':userID')
    async updateUser( @Body() updateUserDTO : CreateUserDTO, @Param('userID') userID){
         const resp = await this.UserService.updateCustomer(userID, updateUserDTO);
         return apiResponseBuilder(resp, true, HttpStatus.OK, HttpStatus.OK.toString());
    }

    @Delete(':userID')
    async deleteUser(@Query() query) {
         const resp = await this.UserService.deleteCustomer(query.userID);
         return resp;
    }

    @Post('/login')
    async login(@Body() loginDto : LoginDto ){
        const resp = await this.UserService.login(loginDto.phoneNumber, loginDto.password);
        return apiResponseBuilder(resp, true, HttpStatus.OK, HttpStatus.OK.toString());
    }
}
