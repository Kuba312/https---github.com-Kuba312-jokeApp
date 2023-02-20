import { FormGroup, UntypedFormGroup } from "@angular/forms";

export function validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
        formGroup.controls[key].markAsTouched();
        formGroup.controls[key].markAsDirty();
    })
}