type Theme = {
    bgcolour: string;
    txcolour: string;
    accent: string;
    accent2?: string;
    navcolour: string;
}

export const lightTheme: Theme = {
  bgcolour: '#b2da8130',
  txcolour: '#120309',
  accent: '#ea9e8d',
  navcolour: '#528a47',
}; 

export const darkTheme: Theme = {
  bgcolour: '#120309',
  txcolour: '#fff',
  accent: '#ea9e8d',
  accent2: '#528a47',
  navcolour: '#b2da81',
}; 