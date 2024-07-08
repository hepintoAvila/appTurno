/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import MenuModuloPrincipal from '../../Project/ModuloActas/Componentes/MenuModuloPrincipal';

const BtnNivelI = ({ itemUrl }) => {

console.log('itemUrl',itemUrl);
  return (
    <MenuModuloPrincipal itemUrl={itemUrl} />
  );
};

export default BtnNivelI;
