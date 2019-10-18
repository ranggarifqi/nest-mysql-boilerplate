import { ApiModelProperty } from "@nestjs/swagger";

export class CreateNoteDto {
  @ApiModelProperty()
  readonly userId;

  @ApiModelProperty()
  readonly title;

  @ApiModelProperty()
  readonly description?;
}