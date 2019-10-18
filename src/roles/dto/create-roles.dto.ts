import { ApiModelProperty } from "@nestjs/swagger";

export class CreateRolesDto {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly description: string;
}