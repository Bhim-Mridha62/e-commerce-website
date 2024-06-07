import Loading from '@/components/Loading/Loading';
import dynamic from 'next/dynamic';
import React from 'react';

const CartContent = dynamic(() => import('@/components/cart/CartContent'), {
  ssr: false, // Disable server-side rendering if the component should only render on the client
  loading: () => <Loading className="mt-40"/>,
});

function Index() {
  return (
    <div>
      <CartContent />
    </div>
  );
}

export default Index;
