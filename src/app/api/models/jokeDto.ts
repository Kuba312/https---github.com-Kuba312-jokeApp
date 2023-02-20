import { CategoryDto } from "./categoryDto";

export interface JokeDto {
    id?: string;
    category?: string;
    content?: string;
    myJoke?: boolean;
}