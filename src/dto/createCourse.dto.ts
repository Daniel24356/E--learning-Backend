import { IsNotEmpty, Length, IsNumber, Min, Max, IsArray, IsOptional, IsString } from "class-validator";

export class CreateCourseDTO {
  @IsNotEmpty()
  @Length(2, 60)
  title!: string;

  @IsNotEmpty()
  @Length(10, 500) // Optional: Define a reasonable length for the description
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0) // Ensure the price is non-negative
  price!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1) // Minimum duration (in hours, days, etc.)
  @Max(1000) // Maximum duration
  duration!: number;

//   @IsOptional() // Optional field
//   @IsArray()
//   @IsString({ each: true }) // Ensure each element is a string
//   enrollment?: string[];
}
