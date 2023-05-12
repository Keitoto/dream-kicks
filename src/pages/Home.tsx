import { products } from '@/data';
import { Container, SimpleGrid, Card, AspectRatio, Title,Image,Text } from '@mantine/core';

export const Home = () => {
  return (
    <Container>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {products.map((product) => {
          return (
            <Card key={product.id}>
              <AspectRatio ratio={1920 / 1080}>
                <Image src={product.image} alt={product.name} />
              </AspectRatio>
              <Title order={2}>
                {product.name}
                <span className="price">{product.price}</span>
              </Title>
              <Text>{product.description}</Text>
            </Card>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};
