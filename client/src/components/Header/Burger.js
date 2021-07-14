import React, { useState } from 'react';
import ResponsiveNav from './ResponsiveNav';

const Burger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="burger" onClick={() => setOpen(true)}>
        <span className="burger-child"></span>
        <span className="burger-child"></span>
        <span className="burger-child"></span>
      </div>
      <ResponsiveNav open={open} setOpen={setOpen} />
    </>
  );
};

export default Burger;
