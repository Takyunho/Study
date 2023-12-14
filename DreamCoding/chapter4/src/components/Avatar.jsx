import React from 'react';

export default function Avatar({ image, isNew}) {
  return (
    <div className="avatar-wrap">
      <img src={image} alt="avatar" className="photo" />
      {/* isNew가 true인 경우에만 span태그를 보여준다. */}
      {isNew && <span className="new">NEW</span>}
    </div>
  );
}

