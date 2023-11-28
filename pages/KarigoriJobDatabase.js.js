// KarigoriJobDatabase.js

import React from 'react';
import Design from './components/Design';
const KarigoriJobDatabase = () => {
  return (
    <>
    <Design />
    <div style={{ margin: '20px', display:'flex',justifyContent:'center' }}>

      <iframe
        style={{
          zIndex: 2,
          background: 'white',
          border: 'none',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
          width: '65%',
          height: '80vh', // Adjust the height as needed
        }}
        src="https://charts.mongodb.com/charts-karigoriv1-mosxg/embed/charts?id=65619d35-35ac-4fc9-8b2c-3e4e609178b7&maxDataAge=3600&theme=light&autoRefresh=true"
        allowFullScreen
      ></iframe>
    </div>
    </>

  );
};

export default KarigoriJobDatabase;
