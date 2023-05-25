import { useEffect, useState } from 'react';

import {
  Flex,
  ScrollArea,
  Container,
  Select,
  Center,
  Title,
  Text,
  Stack,
  Accordion,
  Checkbox,
  Space,
  Button,
} from '@mantine/core';
import { Helmet } from 'react-helmet-async';

import { HEADER_HEIGHT } from '@/constants/styles';
import { ProductList } from '@/components/Product/ProductList';
import { filterProducts } from '@/helpers/filterProducts';
import { getArrayFromProductValue } from '@/helpers/getArrayFromProductValue';
import { useGetProductsQuery } from '@/hooks/productHooks';
import { Product } from '@/types/Product';

type sortKeys = 'none' | 'AtoZ' | 'ZtoA' | 'lowToHigh' | 'highToLow';
const sortOptions: { value: sortKeys; label: string }[] = [
  { value: 'AtoZ', label: 'A to Z' },
  { value: 'ZtoA', label: 'Z to A' },
  { value: 'lowToHigh', label: 'Price: Low to High' },
  { value: 'highToLow', label: 'Price: High to Low' },
];

export const ProductListPage = () => {
  const [sort, setSort] = useState<string | null>(null);
  const [availability, setAvailability] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!products) return <div>No products found</div>;

  const sortProducts = (products: Product[]) => {
    switch (sort) {
      case 'AtoZ':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'ZtoA':
        return products.sort((a, b) => b.name.localeCompare(a.name));
      case 'lowToHigh':
        return products.sort((a, b) => a.price - b.price);
      case 'highToLow':
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const filteredProducts = filterProducts(products, {
    availability,
    brand,
    category,
  });

  const sortedProducts = sortProducts(filteredProducts);

  return (
    <>
      <Helmet>
        <title>Product List | Dream Kicks</title>
        <meta name="description" content="Product List page for Dream Kicks" />
      </Helmet>
      <Flex>
        <ScrollArea
          w="200px"
          h={`calc(100vh - ${HEADER_HEIGHT}px)`}
          offsetScrollbars
          scrollbarSize={4}
        >
          <Center className="pt-8 pb-4 text-bold text-lg">Filters</Center>
          <Accordion multiple>
            <Accordion.Item value="availability">
              <Accordion.Control>Availability</Accordion.Control>
              <Accordion.Panel>
                <Checkbox.Group value={availability} onChange={setAvailability}>
                  <Checkbox value="inStock" label="In Stock" mb="xs" />
                  <Checkbox value="outStock" label="Out of Stock" mb="xs" />
                </Checkbox.Group>
                <Button onClick={() => setAvailability([])}>Clear</Button>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="price">
              <Accordion.Control>Price</Accordion.Control>
              <Accordion.Panel>
                Configure components appearance and behavior with vast amount of
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="brand">
              <Accordion.Control>Brand</Accordion.Control>
              <Accordion.Panel>
                <Checkbox.Group value={brand} onChange={setBrand}>
                  {getArrayFromProductValue(products, 'brand').map((brand) => (
                    <Checkbox value={brand} label={brand} mb="xs" />
                  ))}
                  <Button onClick={() => setBrand([])}>Clear</Button>
                </Checkbox.Group>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="category">
              <Accordion.Control>Category</Accordion.Control>
              <Accordion.Panel>
                <Checkbox.Group value={category} onChange={setCategory}>
                  {getArrayFromProductValue(products, 'category').map(
                    (brand) => (
                      <Checkbox value={brand} label={brand} mb="xs" />
                    )
                  )}
                  <Button onClick={() => setCategory([])}>Clear</Button>
                </Checkbox.Group>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <Space h={200} />
        </ScrollArea>
        <ScrollArea
          h={`calc(100vh - ${HEADER_HEIGHT}px)`}
          className="flex-1 p-8 pb-0"
          offsetScrollbars
          scrollbarSize={4}
        >
          <Container>
            <Stack spacing="xs" className="py-8 text-center">
              <Title>Sneakers</Title>
              <Text>Shop through our latest selection of Sneakers</Text>
            </Stack>
            <Select
              w={200}
              className="ml-auto mb-16"
              value={sort}
              onChange={setSort}
              data={sortOptions}
              clearable
            ></Select>
            {availability.length > 0 ||
            brand.length > 0 ||
            category.length > 0 ? (
              <Text className="mb-8">
                Filter:{' '}
                {availability?.map((i) => (
                  <span className="text-sm bg-bg mr-2 px-2 py-0.5 rounded-md">
                    {i}
                  </span>
                ))}
                {brand?.map((i) => (
                  <span className="text-sm bg-teal-100 mr-2 px-2 py-0.5 rounded-md">
                    {i}
                  </span>
                ))}
                {category?.map((i) => (
                  <span className="text-sm bg-red-100 mr-2 px-2 py-0.5 rounded-md">
                    {i}
                  </span>
                ))}
              </Text>
            ) : null}
            {sortedProducts.length > 0 ? (
              <ProductList products={sortedProducts} />
            ) : (
              <Text className="text-center">No products found</Text>
            )}
          </Container>
          <Space h={200} />
        </ScrollArea>
      </Flex>
    </>
  );
};
