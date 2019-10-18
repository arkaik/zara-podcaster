import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/loading/actions.js';

const { startLoading, endLoading } = actions;

export function SuspenseFallback() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    return () => {
      dispatch(endLoading());
    }
  }, [dispatch]);

  return null;
};

function LoadingIndicator({ className = '' }) {
  const isLoading = useSelector(({ Loading }) => Loading.active);

  return (
    <div className={`loadingIndicator ${className} ${isLoading? 'active' : ''}`}></div>
  );
};

export default LoadingIndicator;
