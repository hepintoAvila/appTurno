// @flow
import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';
import { useSecurity } from '../layouts/context/SecurityProvider';

/* Password Input */
const PasswordInput = ({ name, placeholder, refCallback, errors, register, className }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <InputGroup className="mb-0">
                <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    name={name}
                    id={name}
                    as="input"
                    ref={(r) => {
                        if (refCallback) refCallback(r);
                    }}
                    className={className}
                    isInvalid={errors && errors[name] ? true : false}
                    {...(register ? register(name) : {})}
                    autoComplete={name}
                />
                <div
                    className={classNames('input-group-text', 'input-group-password', {
                        'show-password': showPassword,
                    })}
                    data-password={showPassword ? 'true' : 'false'}>
                    <span
                        className="password-eye"
                        onClick={() => {
                            setShowPassword(!showPassword);
                        }}></span>
                </div>
            </InputGroup>
        </>
    );
};

type FormInputProps = {
    label?: string,
    type?: string,
    name?: string,
    placeholder?: string,
    register?: any,
    errors?: any,
    className?: string,
    labelClassName?: string,
    containerClass?: string,
    refCallback?: any,
    children?: any,
};

const FormInput = ({
  label,
  type,
  name,
  placeholder,
  register,
  errors,
  className,
  labelClassName,
  containerClass,
  refCallback,
  children,
  ...otherProps
}: FormInputProps): React$Element<React$FragmentType> => {
  const { checkSpecialChars, errors: securityErrors } = useSecurity(); // Usar el hook useSecurity

  const handleChange = (e) => {
    const value = e.target.value;
    checkSpecialChars(name, value);
    if (register && register(name) && register(name).onChange) {
      register(name).onChange(e); // Asegurar que se pasa el evento, no un objeto
    }
  };

  const comp = type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input';
  const fieldErrors = securityErrors[name] || {};

  return (
      <>
          {type === 'hidden' ? (
              <input type={type} name={name} {...(register ? register(name) : {})} {...otherProps} />
          ) : (
              <>
                  {type === 'password' ? (
                      <>
                          <Form.Group className={containerClass}>
                              {label ? (
                                  <>
                                      <Form.Label className={labelClassName}>{label}</Form.Label> {children}
                                  </>
                              ) : null}
                              <PasswordInput
                                  name={name}
                                  placeholder={placeholder}
                                  refCallback={refCallback}
                                  errors={errors}
                                  register={register}
                                  className={className}
                              />
                              {errors && errors[name] ? (
                                  <Form.Control.Feedback type="invalid" className="d-block">
                                      {errors[name]['message']}
                                  </Form.Control.Feedback>
                              ) : null}
                          </Form.Group>
                      </>
                  ) : type === 'number' ? (
                  <Form.Group className={containerClass}>
                    {label && <Form.Label className={labelClassName}>{label}</Form.Label>}
                    <Form.Control
                      type="number"
                      placeholder={placeholder}
                      name={name}
                      id={name}
                      ref={(r) => {
                        if (refCallback) refCallback(r);
                      }}
                      className={className}
                      isInvalid={errors && errors[name] ? true : false}
                      value={otherProps.value}
                      onChange={handleChange}
                      {...(register ? register(name) : {})}
                      {...otherProps}
                      autoComplete={name}
                    >
                      {children ? children : null}
                    </Form.Control>
                    {/* Manejo de errores y otros feedback */}
                  </Form.Group>
                ) : (
                      <>
                          {type === 'checkbox' || type === 'radio' ? (
                              <Form.Group className={containerClass}>
                                  <Form.Check
                                      type={type}
                                      label={label}
                                      name={name}
                                      id={name}
                                      ref={(r) => {
                                          if (refCallback) refCallback(r);
                                      }}
                                      className={className}
                                      isInvalid={errors && errors[name] ? true : false}
                                      {...(register ? register(name) : {})}
                                      {...otherProps}
                                  />
                                  {errors && errors[name] ? (
                                      <Form.Control.Feedback type="invalid">
                                          {errors[name]['message']}
                                      </Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                          ) : (
                              <Form.Group className={containerClass}>
                                  {label ? <Form.Label className={labelClassName}>{label}</Form.Label> : null}
                                  <Form.Control
                                      type={type}
                                      placeholder={placeholder}
                                      name={name}
                                      id={name}
                                      as={comp}
                                      ref={(r) => {
                                          if (refCallback) refCallback(r);
                                      }}
                                      className={className}
                                      isInvalid={errors && errors[name] ? true : false}
                                      value={otherProps.value} // Asegurarse de usar el valor del estado
                                      onChange={handleChange}
                                      {...(register ? register(name) : {})}
                                      {...otherProps}
                                      autoComplete={name}>
                                      {children ? children : null}
                                  </Form.Control>
                                  {fieldErrors.hasSpecialChar && (
                                      <Form.Control.Feedback type="invalid" className="d-block">
                                          Caracteres especiales no están permitidos!
                                      </Form.Control.Feedback>
                                  )}
                                  {fieldErrors.isEmpty && (
                                      <Form.Control.Feedback type="invalid" className="d-block">
                                          La entrada no puede estar vacía!
                                      </Form.Control.Feedback>
                                  )}
                                  {errors && errors[name] ? (
                                      <Form.Control.Feedback type="invalid">
                                          {errors[name]['message']}
                                      </Form.Control.Feedback>
                                  ) : null}
                              </Form.Group>
                          )}
                      </>
                  )}
              </>
          )}
      </>
  );
};

export default FormInput;
