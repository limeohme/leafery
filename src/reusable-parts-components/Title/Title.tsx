import './Title.css';
interface TitleProps {
  text: string;
}
export default function Title ({ text }: TitleProps) {
  return <h1 id='page-title'>{text}</h1>;
}