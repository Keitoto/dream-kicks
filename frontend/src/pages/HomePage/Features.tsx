import { Center, List, Text, Box, Container, ThemeIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import {
  CircleCheck,
  CircleLetterK,
  CubeSend,
  Key,
  TruckReturn,
  TwentyFourHours,
} from 'tabler-icons-react';

export const Features = () => {
  return (
    <Container size="xl" className="py-16 px-8">
      <List className="flex justify-between">
        <List.Item
          w="22%"
          icon={
            <ThemeIcon c="gray.6" size="xl" className="bg-white mr-4">
              <CubeSend size={48} />
            </ThemeIcon>
          }
        >
          <Text weight={500}>Free shipping</Text>
          <Text c="gray.6">Free shipping on order above $100</Text>
        </List.Item>
        <List.Item
          w="22%"
          icon={
            <ThemeIcon c="gray.6" size="xl" className="bg-white mr-4">
              <TwentyFourHours size={48} />
            </ThemeIcon>
          }
        >
          <Text weight={500}>SUPPORT 24/7</Text>
          <Text c="gray.6">Contact us 24 hours a day, 7 days a week</Text>
        </List.Item>
        <List.Item
          w="22%"
          icon={
            <ThemeIcon c="gray.6" size="xl" className="bg-white mr-4">
              <TruckReturn size={48} />
            </ThemeIcon>
          }
        >
          <Text weight={500}>30 DAYS RETURN</Text>
          <Text c="gray.6">
            Simply return it within 30 days for an exchange.
          </Text>
        </List.Item>
        <List.Item
          w="22%"
          icon={
            <ThemeIcon c="gray.6" size="xl" className="bg-white mr-4">
              <Key size={48} />
            </ThemeIcon>
          }
        >
          <Text weight={500}>100% PAYMENT SECURE</Text>
          <Text c="gray.6">We ensure secure payment with PEV</Text>
        </List.Item>
      </List>
    </Container>
  );
};
