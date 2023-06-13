import { Controller, Get, Post, Body } from "@nestjs/common"
import { UsersServices } from "../services/user.service"
import {  DtoFindOneByEmail, DtoUser, DtoUserLogin } from "../dtos/dto.user"


@Controller("users")
export class UsersController {
  constructor(private readonly users: UsersServices) {}


  @Get() 
  FindAll() {
    return this.users.FindAll()
  }

  @Get() 
  FindOneByEmail(@Body() email: DtoFindOneByEmail) {
      return this.users.FindOneByEmail(email)
  }

  @Post("/register")
  Create(@Body() creatingUserData: DtoUser) {
    return this.users.Create(creatingUserData)
  }

  @Post("/login")
  Login(@Body() login: DtoUserLogin) {
    return this.users.Login(login)
  }



}