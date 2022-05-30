import React from 'react'

function UserDetail(props) {
    console.log(props);
  return (
    <div>{props.record}</div>
  );
}

export default UserDetail;