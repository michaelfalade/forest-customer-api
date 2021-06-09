import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './customer.schema';
import { CreateUserDTO } from './dto/createCustomerDto';

const bcrypt = require('bcrypt');

@Injectable()
export class CustomerService {
            constructor( @InjectModel(Customer.name) private customerModel : Model<CustomerDocument>){

            }

            //fetches all customers
            getCustomers() : Promise<any>{
                return this.customerModel.find().sort({createdAt: -1}).exec();
           }

           //fetches a customer with a unque GUID
           getCustomer(userID) : Promise<any> {
               let id = Number(userID);
                const user =  this.customerModel.findById(userID).exec();
                if(!user)
                       throw new HttpException('user does not exist', 404);
                return user;
           }

           //creates a customer
           async addCustomer(user:CreateUserDTO) : Promise<Customer>{

                try {
                      const newUser =  new this.customerModel(user);
                      newUser.password = await bcrypt.hash(newUser.password, 10);
                      const savedUser =  await newUser.save();

                      savedUser.password = undefined;

                     // await this.clientService.verifyBVN(0);
                      return savedUser;
                } catch (error) {
                      console.log("error", error);
                      throw new HttpException('Error occured!', HttpStatus.INTERNAL_SERVER_ERROR);
                }
           }

           //update old document with new 
           async updateCustomer(userID: any, user:any) : Promise<any>{
               try {
                   const existingCustomer =  this.customerModel.findById(userID).exec();
                   const merged = {...existingCustomer, ...user};
                   const updatedCustomer = await this.customerModel.updateOne({_id : userID}, merged, {new : true}).exec();
                   return updatedCustomer;
               } catch (error) {
                   console.log("error", error);
               }
           }

           //soft-deletes a customer
           deleteCustomer(userID) : Promise<any> {
             const resp =  this.customerModel.deleteOne(userID).exec();
             return resp
           }

           //login with phone number and password
           async login(phoneNumber: string, password: string) : Promise<any> {
                      const user = await  this.customerModel.findOne({phoneNumber : phoneNumber}).exec();
                      if(!user)
                          throw new HttpException('Not found', HttpStatus.NOT_FOUND);

                      const isValid = await bcrypt.compare(password, user.password);
                      if(!isValid)
                            throw new HttpException('Authentication failed', HttpStatus.UNAUTHORIZED);

                      return {code : HttpStatus.OK, user: user, message : 'Authentication Successful!'};
           }

}
