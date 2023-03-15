import {createArtwork} from '../../store/artworks'
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchArtworks } from '../../store/artworks';

export default function CreateArtworkPage(){
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState([]);
    const [imageUrl, setImageUrl] = useState([]);
    const fileRef = useRef(null);
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user)


    useEffect(()=>{
        dispatch(fetchArtworks())
    }, [dispatch])

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("image", image);
        console.log(name, "name")
        console.log(description,"description")
        console.log(price, "price")
        console.log(image,"image")
        dispatch(createArtwork(formData)); 
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
        setImage(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setImageUrl(fileReader.result);
            };
        } else {
            setImageUrl('');
        }
        // console.log(image, "image")
        // console.log(imageUrl, "imageUrl")
    };
    
    return(
        <>
            <form>
                <label>Name
                    <input 
                        value={name}
                        placeholder="Enter a name for this artwork"
                        onChange={(e) => setName(e.target.value)}>
                    </input>
                </label>
                <label>Description
                    <input
                    value={description} onChange={(e) => {
                        setDescription(e.target.value)
                    }} placeholder={`Enter description for this artwork`}>
                        </input>
                </label>
                <label>Price
                    <input 
                        value={price}
                        placeholder="Enter a price for this artwork"
                        onChange={(e) => setPrice(e.target.value)}>
                    </input>
                </label>
                <label>
                    Image to Upload
                    <input
                        type="file"
                        ref={fileRef}       
                        accept=".jpg, .jpeg, .png"
                        multiple
                        onChange={updateFile} />
                </label>
                <button onClick={handleSubmit}>Upload New Artwork</button>
            </form>
        </>   
    )
}

