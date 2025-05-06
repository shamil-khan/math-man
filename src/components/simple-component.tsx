import * as React from 'react';
import logger from '../services/LoggingService';

// Define the props interface
interface MyComponentProps {
  name: string;
  age: number;
  children?: React.ReactNode; // Optional: allows passing child elements
}

// Create the functional component
const MyComponent: React.FC<MyComponentProps> = ({
  name,
  age,
  children,
}): React.ReactNode => {
  logger.debug('simple component', name, age, children);
  return (
    <div className="my-component">
      <h2>Hello, {name}!</h2>
      <p>You are {age} years old.</p>
      {children && <div>{children}</div>}
    </div>
  );
};

export default MyComponent;
