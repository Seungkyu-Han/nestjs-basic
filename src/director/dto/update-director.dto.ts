import { IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateDirectorDto {
  @IsNotEmpty()
  name: string;

  @IsDateString()
  dob: Date;

  @IsNotEmpty()
  nationality: string;
}
