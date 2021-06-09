import {Schema, SchemaFactory, Prop} from '@nestjs/mongoose';
import {Schema as MongooseSchema, Document} from 'mongoose';
import bcrypt from 'bcrypt';

export type CustomerDocument = Customer & Document;

@Schema({timestamps : true, versionKey : false})
export class Customer {
    @Prop({required:true})
    firstName : String;
    @Prop({required:true})
    lastName : String;
    @Prop({unique:true, required:true})
    email : String;
    @Prop({required:false})
    dateOfBirth : Date;
    @Prop({required:false})
    address : String;
    @Prop({type:MongooseSchema.Types.Number})
    countryId : Number;
    @Prop({unique:true, required:true})
    phoneNumber : String;
    @Prop({required:true})
    password: string;
    @Prop({type : String})
    role : {type : String}
    @Prop({default: false})
    isVerified : boolean;
    @Prop({default: true})
    isActive : boolean;
    @Prop({default: false})
    isDeleted : boolean;
}

const CustomerSchema =  SchemaFactory.createForClass(Customer);

CustomerSchema.methods.hashString = (myString)=>{
     return bcrypt.hashSync(myString, bcrypt.genSaltSync(10));
}

export default CustomerSchema;