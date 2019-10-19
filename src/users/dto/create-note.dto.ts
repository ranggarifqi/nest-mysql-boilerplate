import { ApiModelProperty } from "@nestjs/swagger";

export class CreateUserNoteDto {
  @ApiModelProperty()
  readonly title;

  @ApiModelProperty()
  readonly description?;
}