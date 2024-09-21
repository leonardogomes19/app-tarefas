'use client';

import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // Ajuste aqui

const Header = () => {
  const today = new Date();
  const formattedDate = format(today, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  return (
    <header>
      <div className="logo-container">
        <img className="logoImg" src="/images/FocalPoint.png" alt={('FocalPoint')}></img>
        <div className="logo">FocalPoint</div>
      </div>
      <div className="welcome-message">
        Bem-vindo de volta, Marcus
      </div>
      <div className="date">{formattedDate}</div>
    </header>
  );
};

export default Header;