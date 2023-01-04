import { AbstractControl } from '@angular/forms';

export const PasswordMatchValidator = (
  passwordControlName: string,
  confirmPasswordControlName: string
) => {
  //validators function gets form
  const Validators = (form: AbstractControl) => {
    //here should be validation is done based on confirmControlName
    //and confirmControlName
    const passwordControl = form.get(passwordControlName);
    const confirmPasswordControl = form.get(confirmPasswordControlName);

    //if passwordControl,confirmPasswordControl both are invalid
    //then simply return

    if (!passwordControl || !confirmPasswordControl) return;

    //is not match
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ notMatch: true });
    } else {
      const errors = confirmPasswordControl.errors;
      if (!errors) return;

      delete errors.notMatch;
      confirmPasswordControl.setErrors(errors);
    }
  };
  return Validators;
};
