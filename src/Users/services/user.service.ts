import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {User} from "src/Users/models/user.schema"
import { DtoFindOneByEmail, DtoUser, DtoUserLogin } from '../dtos/dto.user';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable() 
export class UsersServices {
  constructor(@InjectModel(User.name) private UserModel: Model<User>,
  private readonly jwtService: JwtService

  ) {}

  FindAll() {
    return this.UserModel.find()
  }


  async FindOneByEmail(email: DtoFindOneByEmail) {
    return this.UserModel.findOne({email: email})
  }


  async Create(creatingUserData: DtoUser) {
    
    const user =  new this.UserModel(creatingUserData)

 
    await user.save()

    return user
    
  }




  async Login(login: DtoUserLogin) {
    const userExist = await this.UserModel.findOne({email: login.email})
    const payload = {name: userExist.name, _id: userExist.id}
    if(!userExist) {
      throw new Error ("User not exist.")
    }

    const passwordCompare = await bcrypt.compare(login.password, userExist.password )

    if(!passwordCompare) {
      throw new Error ("Password is not correct.")
    }   

    return  {
      token: this.jwtService.sign(payload),
    }
  }
}