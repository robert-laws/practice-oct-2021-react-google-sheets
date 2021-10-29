import React from 'react';
import { useEffect, useState } from 'react';

function Data() {
  const [sheetData, setSheetData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        'https://sheet.best/api/sheets/a9a0dfb9-c1fa-4c90-8411-0aba5329e87e'
      );
      const data = await response.json();
      setSheetData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {sheetData?.map((item, index) => {
        return (
          <div key={index}>
            <div>{item.name}</div>
            <div>{item.email}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Data;
