type Theme = {
    bgcolour: string;
    txcolour: string;
    accent: string;
    accent2?: string;
    navcolour: string;
}

export const lightTheme: Theme = {
  bgcolour: '#b2da8130',
  txcolour: '#000',
  accent: '#ff9248',
  navcolour: '#528a47',
}; 

export const darkTheme: Theme = {
  bgcolour: '#091001',
  txcolour: '#fff',
  accent: '#ff9248',
  accent2: '#528a47',
  navcolour: '#b2da81',
};

export const txtTheme = {
  font: 'Noto Sans KR',
  titleFont: 'Amatic SC'
};