import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateDirectorDto {
  @IsNotEmpty()
  name: string;

  @IsDateString()
  dob: Date;

  @IsNotEmpty()
  nationality: string;
}
