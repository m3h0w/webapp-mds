import React, { memo } from 'react';
import Image from 'next/image';

function CustomNode({ data }: { data: { image: string } }) {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        border: '1px solid #ddd',
        borderRadius: '5px',
        background: 'white',
      }}
    >
      <Image
        src={data.image}
        alt="Node image"
        width={100}
        height={100}
        objectFit="cover"
      />
    </div>
  );
}

export default memo(CustomNode);
