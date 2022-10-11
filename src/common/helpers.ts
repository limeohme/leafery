import React from 'react';

export const messageSetter = (message: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
  setter(message);

  setTimeout(() => {
    setter('');
  }, 2600);
};

export const cleanPathForDB = (path: string) => {
  return path.replace(/[/[\]$#. \n]/g, '');
};

export const dateFormatter = (date: Date) => {
  return `${date.toDateString()} ${date.toLocaleTimeString()}`;
};
