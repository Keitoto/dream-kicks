import {
  Text,
  Container,
  Flex,
  Stack,
  List,
  Box,
  Group,
  Button,
  Input,
  TextInput,
} from '@mantine/core';
import {
  Mail,
  MapPin,
  Phone,
  BrandFacebook,
  BrandInstagram,
  BrandTwitter,
  BrandPinterest,
} from 'tabler-icons-react';

import { useGetProductsQuery } from '@/hooks/productHooks';

export const Footer = () => {
  const { data: products, isLoading } = useGetProductsQuery();

  return (
    <>
      <footer className="bg-[#ECEBEC] px-8 py-16">
        <Container size="xl">
          <Flex gap="xl" justify="space-between">
            <Stack mr="xl">
              <Text className="font-bold text-2xl">Dream Kicks</Text>
              <List spacing="sm" mt="md" c="gray.6">
                <List.Item icon={<MapPin />}>1234, Berlin, Germany</List.Item>
                <List.Item icon={<Mail />}>info@example.com</List.Item>
                <List.Item icon={<Phone />}>+001 1234 5678</List.Item>
              </List>
              <Flex gap="md" c="gray.7">
                <BrandFacebook />
                <BrandInstagram />
                <BrandTwitter />
                <BrandPinterest />
              </Flex>
            </Stack>
            <Flex
              ml="xl"
              gap="40px"
              justify="space-between"
              className="flex-1 max-w-[500px]"
            >
              <Box>
                <Text mb="xl">Categories</Text>
                {isLoading ? (
                  <Text>Loading...</Text>
                ) : !products || products.length === 0 ? (
                  <Text>No category found</Text>
                ) : (
                  <List listStyleType="none" c="gray.6" spacing="sm">
                    {[
                      ...new Set(
                        products.flatMap((product) => product.category)
                      ),
                    ]
                      .sort()
                      .map((category) => (
                        <List.Item>{category}</List.Item>
                      ))}
                  </List>
                )}
              </Box>
              <Box>
                <Text mb="xl">Brand</Text>
                {isLoading ? (
                  <Text>Loading...</Text>
                ) : !products || products.length === 0 ? (
                  <Text>No category found</Text>
                ) : (
                  <List listStyleType="none" c="gray.6" spacing="sm">
                    {[
                      ...new Set(
                        products.flatMap((product) => product.category)
                      ),
                    ]
                      .sort()
                      .map((category) => (
                        <List.Item>{category}</List.Item>
                      ))}
                  </List>
                )}
              </Box>
              <Box>
                <Text mb="xl">Information</Text>
                <List listStyleType="none" c="gray.6" spacing="sm">
                  <List.Item>About us</List.Item>
                  <List.Item>Contact us</List.Item>
                  <List.Item>Terms & Conditions</List.Item>
                  <List.Item>Returns & Exchanges</List.Item>
                  <List.Item>Shipping & Delivery</List.Item>
                  <List.Item>Privacy Policy</List.Item>
                </List>
              </Box>
            </Flex>
            <Box className="max-w-[300px]">
              <Text mb="xl">Newsletter</Text>
              <Text c="gray.6">
                Subscribe to our newsletter and get 10% off your first purchase
              </Text>
              <Group mt="md" spacing="sm">
                <TextInput placeholder="Your email" className='w-full' />
                <Button>Subscribe</Button>
              </Group>
            </Box>
          </Flex>
        </Container>
      </footer>
      <Box className="text-center bg-white p-4 text-sm">
        <Text c="gray.6">© 2021 Dream Kicks. All rights reserved.</Text>
      </Box>
    </>
  );
};
