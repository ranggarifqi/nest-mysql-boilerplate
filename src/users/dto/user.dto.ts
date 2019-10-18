import { ApiModelProperty } from "@nestjs/swagger";

export class CreateUserProfileDto {
  @ApiModelProperty()
  readonly fullName: string;

  @ApiModelProperty()
  readonly mobile?: string;

  @ApiModelProperty()
  readonly gender?: string;
  
  @ApiModelProperty()
  readonly address?: string; 
}

export class CreateUserDto {
  @ApiModelProperty()
  readonly role: string;

  @ApiModelProperty()
  readonly username: string;
  
  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly password: string;

  @ApiModelProperty()
  readonly profile: CreateUserProfileDto;
}

export class LoginDto {
  @ApiModelProperty()
  readonly email: string;
  
  @ApiModelProperty()
  readonly password: string;
}