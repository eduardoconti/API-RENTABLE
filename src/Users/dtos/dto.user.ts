import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class DtoUser {

  @IsNotEmpty()
  name: string; 
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsStrongPassword()
  password: string
}

export class DtoUserLogin {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  

  @IsNotEmpty()
  @IsStrongPassword()
  password: string
  
}


export class DtoFindOneByEmail {
  @IsNotEmpty()
  @IsEmail()
  email: string 
}