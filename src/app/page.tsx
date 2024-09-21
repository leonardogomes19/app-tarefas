'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a página de tarefas
    router.push('/tarefas');

  }, [router]);

  return (
    <div>
      {/* Um fallback simples para exibir algo enquanto redireciona para a página */}
      <p>Carregando...</p>
    </div>
  );
}