# Pixel Panda
#### [Pixel Panda](https://pixelpanda.onrender.com) is an online marketplace for game assets, where game artists can showcase and sell their artworks. Game developers and buyers can browse through various categories of assets on the website, add desired artworks to their shopping carts, or save them to their wish lists for future reference. In addition to browsing and purchasing assets, PixelPanda also allows users to leave reviews on the artworks they have bought or used. This feature helps provide valuable feedback to the artists and enables buyers to make informed decisions when selecting assets. Users can write, edit, or delete their reviews as necessary.

<img src="https://github.com/ldldylan/PixelPanda/blob/demo/frontend/assets/demo/MainPage.gif?raw=true" width=900 height= 420/>

## Functionalities & MVPs
* Artworks(CRUD)
* Artworks comments(CRUD)
* Shopping Card(CRUD)
* Search functionality

## Technologies
* Frontend: React and React Native with Redux
* Backend: Node, Express, MongoDB
* AWS
* Websocket
* Stripe

## Highlightened Features
### Categories
<img src="https://github.com/ldldylan/PixelPanda/blob/demo/frontend/assets/demo/Categories.gif?raw=true" width=900 height=420/>

### Create Artwork
<img src="https://github.com/ldldylan/PixelPanda/blob/demo/frontend/assets/demo/CreateArtwork.gif?raw=true" width=900 height=420/>

### Checkout
<img src="https://github.com/ldldylan/PixelPanda/blob/demo/frontend/assets/demo/Checkout.gif?raw=true" width=900 height=420/>

## Hightlightened Code Snippets

### Creating a Wishlist Item
```javascript
router.post('/users/:userId', requireUser, validateWishlistItemInput, async (req, res, next) => {
    // console.log(req.body, "req.body")
    // console.log(req.params, "req.params")
    try {
        const newWishlistItem = new WishlistItem({
            user: req.params.userId,
            artwork: req.body.artwork
        });
        let wishlistItem = await newWishlistItem.save();
        wishlistItem = await wishlistItem.populate('user', 'artwork');
        return res.json(wishlistItem);
    }
    catch (err) {
        next(err);
    }
});
```

### Uploading a Single File with AWS
```javascript
const singleFileUpload = async ({ file, public = false }) => {
    const { originalname, buffer } = file;
    const path = require("path");
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
        Bucket: NAME_OF_BUCKET,
        Key: public ? `public/${Key}` : Key,
        Body: buffer
    };
    const result = await s3.upload(uploadParams).promise();
    return public ? result.Location : result.Key;
};
```

### Sending Information to the Stripe API
```javascript
router.post('/', async (req, res) => {
    let success_url = `${process.env.CLIENT_URL}/checkout`;
    let cancel_url = `${process.env.CLIENT_URL}/cart`;
    const website = "https://pixelpanda.onrender.com";
    if (isProduction) {
        success_url = `${website}/checkout`;
        cancel_url = `${website}/cart`;
    }

    const session = await stripe.checkout.sessions.create({
        line_items: req.body.cartItems.map(cartItem => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: cartItem.name,
                        images: [cartItem.ArtworkImageUrl],
                    },
                    unit_amount: parseFloat((cartItem.price * 100).toFixed(2)),
                },
                adjustable_quantity: {
                    enabled: false,
                },
                quantity: 1,
            }
        }),
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        success_url: success_url,
        cancel_url: cancel_url,
    });
    res.send(session);
});
```
## Handling Frontend Validations for Creating Artwork
```javascript
const handleSubmit = (e) => {
    e.preventDefault();
    if (image.length === 0) {
        alert('Please upload an image');
        return;
    }
    const formData = new FormData();
    const errorData = {
        name: "",
        description: "",
        price: "",
        category: ""
    };

    if (name.trim()) formData.append("name", name.trim());
    else errorData.name = "Please enter a name";

    if (description.trim()) formData.append("description", description.trim());
    else errorData.description = "Please enter a description";

    if (price && !isNaN(price) && price > 0 && price < 100000) {
        const formattedPrice = parseFloat(parseFloat(price).toFixed(2));
        formData.append("price", formattedPrice);
    }
    else errorData.price = "Please enter a valid price";

    formData.append("image", image);

    if (category) formData.append("category", category);
    else errorData.category = "Please select a category";

    formData.append("author", sessionUser._id)

    setErrors(errorData);

    if (errorData.name || errorData.description || errorData.price || errorData.category) return;
    else {
        dispatch(createArtwork(formData)).then(() => {
            if (updateShouldFetchArtworks) {
                updateShouldFetchArtworks(true);
            }
            setImage([]);
            setImageUrl([]);
            setPrice("0")
            setName('');
            setDescription('');
            setCategory("");
            fileRef.current.value = null;
            onClose();
            dispatch(fetchArtworks());
        });
    }

};
```
## Handling Information for Reviews
```
const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
        ...review,
        content,
        rating,
        author,
        artworkId
    }
    setErrors([]);
    if (formType === "Edit Review") {
        dispatch(updateReview(reviewData,reviewId))
            .then(() => {
                history.push(`/artworks/${artworkId}`)
            })
    } else {
        dispatch(createReview({ artworkId, author, content, rating }))
            .then(() => {
                history.push(`/artworks/${artworkId}`)
            })
    }

}
```
## Sending Information from the Frontend
```javascript
export const checkoutCartItems = (cartItems) => async dispatch => {
    const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
    const res = await jwtFetch(`/api/stripe/`, {
        method: 'POST',
        body: JSON.stringify({ cartItems })
    })
    const session = await res.json();
    stripe.redirectToCheckout({ sessionId: session.id });
}
```


## Bonus Features
* Real-time communication between the artist and buyers 
* End-to-end encryption
* Live drawing for sketch of custom artwork
* Search functionality
* Level tiers for buyers and sellers to trust each other more

## Team members and roles
Dilang Lin: Project Lead

Kenny Tram: Project Frontend Lead

James Wu: Project Backend Lead
