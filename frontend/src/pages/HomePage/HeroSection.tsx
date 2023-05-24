import { Link } from 'react-router-dom';

import Balancer from 'react-wrap-balancer';
import {
  Container,
  Stack,
  SimpleGrid,
  Title,
  Image,
  Text,
  Button,
  Anchor,
} from '@mantine/core';

import heroImg from '@/assets/heroImg.png';

export const HeroSection = () => {
  return (
    <section className="bg-[#ECEBEC] px-8">
      <Container size="xl">
        <SimpleGrid cols={2}>
          <Stack justify="center">
            <Title order={1} className="text-[54px]">
              <Balancer>Find Your Dream Kicks</Balancer>
            </Title>
            <Text size="lg">
              <Balancer>
                Step into the future of footwear with our extraordinary
                collection of 3D AI art sneakers.
              </Balancer>
            </Text>
            <Link to="/products">
              <Button radius="none">Explore Now</Button>
            </Link>
          </Stack>
          <Image src={heroImg} alt="hero image" p="10%" />
        </SimpleGrid>
      </Container>
    </section>
  );
};