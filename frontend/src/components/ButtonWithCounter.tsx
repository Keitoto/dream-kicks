import { FC } from 'react';

import { Button, Center, Flex, UnstyledButton } from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { Minus, Plus } from 'tabler-icons-react';

type Props = {
  max: number;
  handleSubmit: (quantity: number) => void;
  isAvailable: boolean;
};

export const ButtonWithCounter: FC<Props> = ({ max, handleSubmit, isAvailable }) => {
  const [count, handlers] = useCounter(1, { min: 1, max });

  return (
    <Flex>
      <Flex
        align="center"
        className="border-default border-2 border-solid rounded-full px-6 h-12"
      >
        <UnstyledButton
          onClick={handlers.decrement}
          p={0}
          className="leading-none"
          disabled={count === 1}
          c={count === 1 ? 'gray.5' : undefined}
        >
          <Minus />
        </UnstyledButton>
        <Center className="px-4" w="md">
          {count}
        </Center>
        <UnstyledButton
          onClick={handlers.increment}
          p={0}
          className="leading-none"
          c={count === max ? 'gray.5' : undefined}
        >
          <Plus />
        </UnstyledButton>
      </Flex>
      <Button
        onClick={() => {
          handleSubmit(count);
          handlers.reset();
        }}
        disabled={!isAvailable}
        size="md"
        radius="xl"
        className="ml-4 h-12 border-2"
      >
        Add to Cart
      </Button>
    </Flex>
  );
};
