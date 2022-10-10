import React from 'react';

export const messageSetter = (message: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
  setter(message);

  setTimeout(() => {
    setter('');
  }, 2600);
};

export const cleanPathForDB = (path: string) => {
  return path.replace(/[/[\]$#.]/g, '');
};
