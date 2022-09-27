import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AppState from '../providers/app-state';

export default function Authenticated (props: any) {
  const { context: { user } } = useContext(AppState);

  return user? props.children : <Navigate to={'/login'}/>;
};