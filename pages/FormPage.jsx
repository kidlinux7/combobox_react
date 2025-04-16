import React, { useState } from 'react';

const FormPage = ({ form }) => {
  const [responses, setResponses] = useState({});

  const handleChange = (e, field) => {
    setResponses({ ...responses, [field.id]: e.target.value });
  };

  return (
    <div>
      <h2>{form.title}</h2>
      {form.fields.map((field) => (
        <div key={field.id}>
          <label>{field.label}</label>
          {field.field_type === 'text' && (
            <input type="text" onChange={(e) => handleChange(e, field)} />
          )}
          {field.field_type === 'number' && (
            <input type="number" onChange={(e) => handleChange(e, field)} />
          )}
        </div>
      ))}
    </div>
  );
};

export default FormPage;
