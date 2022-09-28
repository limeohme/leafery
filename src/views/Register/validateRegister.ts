import { getUserByHandle } from '../../services/users-service';

type form = {
    email: string;
    name: string;
    pass: string;
    passCheck: string;
}

const mailRE = new RegExp('/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/');

export async function validations (data: form) {
  if (!data.email) {
    throw new Error('Please enter an email address!');
  } 
  if (data.email && mailRE.test(data.email)) {
    throw new Error('Invalid email!');
  }
  if (!data.name) {
    throw new Error('Please enter a username!');
  }
  if (
    data.name.includes('.') || data.name.includes('#') || data.name.includes('$')
    || data.name.includes('[') || data.name.includes(']')
  ) {
    throw new Error('Username cannot include: ".", "#", "$", "[", or "]"');
  }
  const snap = await getUserByHandle(data.name);
  if (snap.exists()) {
    throw new Error('Username is already taken!');
  }
  if (!data.pass || ! data.passCheck) {
    throw new Error('Please enter and confirm your password!');
  }
  if (data.pass.length < 6) {
    throw new Error('Password must be at least 6 characters long!');
  }
  if (data.pass !== data.passCheck) {
    throw new Error('Passwords don\'t match!');
  }
}
