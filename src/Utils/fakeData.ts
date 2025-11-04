import {faker} from '@faker-js/faker';

export const generateFakeProduct = () => {
    return Array.from({ length: 25 }, (_, idx) => {
        return {
            id: idx + 1,
            title: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price({ min: 100, max: 200 })),
            description: faker.commerce.productDescription(),
        };
    });
};