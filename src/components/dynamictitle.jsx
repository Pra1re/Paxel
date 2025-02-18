import React, { useEffect } from 'react';

const DynamicTitle = ({ title, children }) => {
    //console.log("title = ",title)
  useEffect(() => {
    document.title = `${title} | Paxel `;
  }, [title]);

  return children;
};

export default DynamicTitle;