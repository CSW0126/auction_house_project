import React from 'react';
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { FadeLoader  } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FadeLoader color="#36d7b7" />
      {/* {loading ? <p className="mt-5 text-lg font-bold">Loading...</p> : null} */}
    </div>
  );
}

export default Loading;