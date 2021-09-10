import React from 'react';
import PropTypes from 'prop-types';
import { useAssets } from '../../../hooks/useAssets';

export const ListView = () => {
  const { data, isLoading, error } = useAssets();

  console.log('lol', data);

  return <div>Hello world</div>;
};
