import { FormControl, FormGroup, Validators } from "@angular/forms";
import { JokeDto } from "src/app/api/models/jokeDto";
import { uuidv4 } from "src/app/shared/utils/random-id.utils";

export class JokeAddFormModel {

    readonly CATEGORY = 'category';
    readonly CONTENT = 'content';
    readonly ID = 'id';
    readonly MY_JOKE: 'myJoke';

    formGroup: FormGroup;

    constructor() {
        this.buildForm();
    }

    private buildForm() {
        const controls = {
            [this.CATEGORY]: new FormControl('', Validators.required),
            [this.CONTENT]: new FormControl('', Validators.required),
        };
        this.formGroup = new FormGroup(controls);
    }

    toModel(): JokeDto {
        return {
            id: uuidv4(),
            category: this.formGroup.get(this.CATEGORY).value,
            content: this.formGroup.get(this.CONTENT).value,
            myJoke: true
        }
    }
}