import bcrypt from 'bcrypt'

const data = {
    users: [
        {
            name: 'Luciano',
            email: 'luxtucu@gmail.com',
            password: bcrypt.hashSync('155112716', 8),
            isAdmin: true,
        },
        {
            name: 'Jhon',
            email: 'jfcsjhon@gmail.com',
            password: bcrypt.hashSync('155112716', 8),
            isAdmin: false,
        }
    ],
    products: [
        {
            //_id: '1',
            name: 'Nike Slim Shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product'
        },
        {
            //_id: '2',
            name: 'Adidas Fit Shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 100,
            countInStock: 20,
            brand: 'Adidas',
            rating: 5,
            numReviews: 10,
            description: 'High quality product'
        },
        {
            //_id: '3',
            name: 'Lacoste Free Shirt',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 220,
            countInStock: 0,
            brand: 'Lacoste',
            rating: 4.8,
            numReviews: 17,
            description: 'High quality product'
        },
        {
            //_id: '4',
            name: 'Nike Slin Pants',
            category: 'Pants',
            image: '/images/p4.jpg',
            price: 130,
            countInStock: 5,
            brand: 'Nike',
            rating: 4,
            numReviews: 10,
            description: 'High quality product'
        },
        {
            //_id: '5',
            name: 'Puma Slim Shirt',
            category: 'Pants',
            image: '/images/p5.jpg',
            price: 65,
            countInStock: 100,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product'
        },
        {
            //_id: '6',
            name: 'Adidas Fit Pants',
            category: 'Pants',
            image: '/images/p6.jpg',
            price: 120,
            countInStock: 5,
            brand: 'Adidas',
            rating: 3.2,
            numReviews: 8,
            description: 'High quality product'
        },
    ]
}

export default data;