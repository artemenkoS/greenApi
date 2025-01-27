import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { saveInstanceData } from '../../utils';
import { setInstanceData } from '../../store/instanceSlice';
import styles from './Auth.module.css';



export const Auth = () => {
  const dispatch = useDispatch();

  const handleAuthSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { elements } = e.currentTarget;
    const idInstance = (elements.namedItem('idInstance') as HTMLInputElement).value ?? '';
    const apiTokenInstance = (elements.namedItem('apiTokenInstance') as HTMLInputElement).value ?? '';

    const instanceData = {
      idInstance,
      apiTokenInstance,
    };

    saveInstanceData(instanceData);
    dispatch(setInstanceData(instanceData));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleAuthSubmit}>
        <label className={styles.label}>ID Instance:</label>
        <input autoComplete="on" className={styles.input} type="text" name="idInstance" required />
        <label className={styles.label}> API Token Instance:</label>
        <input autoComplete="on" className={styles.input} type="text" name="apiTokenInstance" required />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};