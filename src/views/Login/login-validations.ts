declare interface Form {
    username: string;
    password: string;
}
const mailRE = new RegExp('/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/');

export const validateLogForm = (form: Form) => {
  if (!form.username) {
    throw new Error('Please enter an email address!');
  } 
  if (form.username && mailRE.test(form.username)) {
    throw new Error('Invalid email!');
  }
  if (!form.password) {
    throw new Error('Please enter a password!');
  }
};