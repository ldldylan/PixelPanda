import { updateArtwork } from '../../../store/artworks'
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchArtworks } from '../../../store/artworks';
import { useParams } from 'react-router-dom';

export default function UpdateArtworkPage({props}) {
    const {artwork}= props;
    const [name, setName] = useState(artwork.name)
    const [description, setDescription] = useState(artwork.description)
    const [price, setPrice] = useState(artwork.price)
    const [image, setImage] = useState([]);
    const [imageUrl, setImageUrl] = useState(artwork.ArtworkImageUrl);
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    // const artwork=use;
    const sessionUser = useSelector((state) => state.session.user)
    // console.log(sessionUser._id)

    // useEffect(() => {
    //     dispatch(fetchUserArtworks(id))
    // }, [dispatch])
    const img = document.querySelector('.Uploadpic');
    img.src = imageUrl;

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        // formData.append("image", image);
        formData.append("author", sessionUser._id)
        if (image!=[]) {
            console.log("with image")
            formData.append("image", image);
        } else {
            console.log("without image")
            formData.append("ArtworkImageUrl", imageUrl);
        }
        // console.log(name, "name")
        // console.log(description,"description")
        // console.log(price, "price")
        // console.log(image,"image")
        dispatch(updateArtwork(formData, sessionUser._id));
        setImage([]);
        setImageUrl([]);
        setPrice(0)
        setName('');
        setDescription('');
        fileRef.current.value = null;
    };


    // const updateFiles = async e => {
    //     const files = e.target.files;
    //     setImage(files);
    //     if (files.length !== 0) {
    //         let filesLoaded = 0;
    //         const urls = [];
    //         Array.from(files).forEach((file, index) => {
    //             const fileReader = new FileReader();
    //             fileReader.readAsDataURL(file);
    //             fileReader.onload = () => {
    //                 urls[index] = fileReader.result;
    //                 if (++filesLoaded === files.length)
    //                     setImageUrl(urls);
    //             }
    //         });
    //     }
    //     else setImageUrl([]);
    //     console.log(image, "image")

    // }
    const updateFile = async e => {
        const file = e.target.files[0];
        // console.log(file, "file")
        setImage(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setImageUrl(fileReader.result);
                img.src = fileReader.result;
            };
        } else {
            setImageUrl('');
        }

    };
    useEffect(() => {
        console.log(image, "image")
        console.log(imageUrl, "imageUrl")
    }, [image, imageUrl]);
    return (
        <>
            <form>
                <label>Name
                    <input
                        value={name}
                        placeholder={name}
                        onChange={(e) => setName(e.target.value)}>
                    </input>
                </label>
                <label>Description
                    <input
                        value={description} onChange={(e) => {
                            setDescription(e.target.value)
                        }} placeholder={description}>
                    </input>
                </label>
                <label>Price
                    <input
                        value={price}
                        placeholder={price}
                        onChange={(e) => setPrice(e.target.value)}>
                    </input>
                </label>
                <label>
                    Image to Upload
                    <div className='dotline'><img className="Uploadpic" /></div>
                    <input
                        type="file"
                        ref={fileRef}
                        accept=".jpg, .jpeg, .png"
                        onChange={updateFile} />
                </label>
                <button onClick={handleSubmit}>Update New Artwork</button>
            </form>
        </>
    )
}

