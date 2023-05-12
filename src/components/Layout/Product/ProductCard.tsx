import { Product } from '@/types/Product';
import { Card, AspectRatio, Title, Image,Text } from '@mantine/core';
import { FC } from 'react';

type Props = {
  product: Product;
};

const ProductCard: FC<Props> = ({ product }) => {
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
};

export default ProductCard;
