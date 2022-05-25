import clsx from 'clsx';

export const NeonBox = ({ className = '', children }) => {
  return (
    <div className={clsx(className, 'border-4 shadow rounded')}>{children}</div>
  );
};

export const NeonText = ({ className = '', children }) => {
  return <span className={clsx(className, 'text-shadow')}>{children}</span>;
};
