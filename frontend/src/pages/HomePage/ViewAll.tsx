import { Button, Center } from '@mantine/core';
import { Link } from 'react-router-dom';

export const ViewAll = () => {
  return (
    <Center className="p-16">
      <Link to="/products">
        <Button variant="outline" radius="xl" size="md" color='dark'>
          View All Products
        </Button>
      </Link>
    </Center>
  );
};
