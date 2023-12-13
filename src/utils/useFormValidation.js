import { useCallback, useState } from "react";

function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isValidInput, setIsValidInput] = useState({});

  console.log(values);

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const valid = evt.target.validity.valid;
    const form = evt.target.form;
    

    setValues((oldValues) => {
      return { ...oldValues, [name]: value };
    });

    setErrors((oldErrors) => {
      return { ...oldErrors, [name]: validationMessage };
    });

    setIsValidInput((oldIsValidInput) => {
      return { ...oldIsValidInput, [name]: valid };
    });

    setIsValid(form.checkValidity());
  }

  function reset(data={}) {
    setValues(data)
    setErrors({})
    setIsValidInput({})
    setIsValid(false)
  }

  const setValue = useCallback((name, value) => {
    setValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })
  },[])

  return { values, errors, isValid, isValidInput, handleChange, reset, setValue };
}

export default useFormValidation;
