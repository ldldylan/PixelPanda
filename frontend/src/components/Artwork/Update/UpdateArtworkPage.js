import { getArtwork, updateArtwork } from '../../../store/artworks'
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchArtwork } from '../../../store/artworks';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import './UpdateArtwork.css';
export default function UpdateArtworkPage(props) {
    const { onClose, artwork } = props;
    const dispatch = useDispatch();
    // const { artworkId } = useParams();

    // useEffect(() => {
    //     // dispatch(fetchArtwork(artworkId))
    // }, [dispatch])
    // const artwork = useSelector(getArtwork(artworkId))
    const [name, setName] = useState(artwork ? artwork.name : '');
    const [description, setDescription] = useState(artwork ? artwork.description : '');
    const [price, setPrice] = useState(artwork ? artwork.price : '');
    const [category, setCategory] = useState(artwork ? artwork.category : '');
    const [image, setImage] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        price: "",
        category: ""
    });

    const fileRef = useRef(null);
    const history = useHistory();
    // const artwork=use;
    const sessionUser = useSelector((state) => state.session.user);
    // console.log(sessionUser._id)


    const img = document.querySelector('.Uploadpic');
    // useEffect(() => {

    //     console.log('price', price)
    // }, [price])
    useEffect(() => {

        if (img) {
            img.style.display = 'block';
            img.src = imageUrl;
        }
    }, [imageUrl])

    const handleSubmit = e => {
        e.preventDefault();
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

        if (category) formData.append("category", category);
        else errorData.category = "Please select a category";

        formData.append("author", sessionUser._id)

        if (image !== []) {
            formData.append("image", image);
        } else {
            formData.append("ArtworkImageUrl", imageUrl);
        }




        setErrors(errorData);

        if (errorData.name || errorData.description || errorData.price || errorData.image || errorData.category) return;
        else {
            artwork.name = name;
            artwork.description = description;
            artwork.price = price;
            artwork.category = category;
            artwork.ArtworkImageUrl = imageUrl;
            dispatch(updateArtwork(formData, artwork._id));
            setImage([]);
            setImageUrl([]);
            setPrice(0)
            setName('');
            setDescription('');
            fileRef.current.value = null;
            onClose();
        }

    };

    const handleKeyDown = (e) => {
        const allowedKeys = [
            8, // Backspace
            9, // Tab
            13, // Enter
            27, // Escape
            46, // Delete
            37, // ArrowLeft
            39, // ArrowRight
            190, // Period
            110, // Decimal point (numpad)
            48, // Zero
            49, // One
            50, // Two
            51, // Three
            52, // Four
            53, // Five
            54, // Six
            55, // Seven
            56, // Eight
            57, // Nine
            96, // Zero (numpad)
            97, // One (numpad)
            98, // Two (numpad)
            99, // Three (numpad)
            100, // Four (numpad)
            101, // Five (numpad)
            102, // Six (numpad)
            103, // Seven (numpad)
            104, // Eight (numpad)
            105, // Nine (numpad)
        ];
        const value = e.target.value;
        const decimalIndex = value.indexOf('.');

        if (e.ctrlKey || e.metaKey) {
            return;
        }

        if (!allowedKeys.includes(e.keyCode)
            || (e.shiftKey || (e.keyCode === 190 && e.target.value.includes('.')))
            || (decimalIndex !== -1 && value.substring(decimalIndex + 1).length >= 2 && e.keyCode !== 8)) {
            e.preventDefault();
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData('text/plain');
        const regex = /^[0-9]*(\.[0-9]{0,2})?$/;

        if (!regex.test(pasteData)) {
            e.preventDefault();
        }
    };

    const updateFile = async e => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {

            const validFileTypes = ["image/jpeg", "image/png"];
            if (!validFileTypes.includes(file.type)) {
                alert("Please choose a valid file type: jpg, jpeg, or png");
                e.target.value = null;
                setImage([]);
                setImageUrl('');
                const img = document.querySelector('.Uploadpic');
                img.style.display = 'none';
                img.src = "";
                return;
            }

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                const img = document.querySelector('.Uploadpic');
                setImage(file);
                setImageUrl(fileReader.result);
                img.style.display = 'block';
                img.src = fileReader.result;
            };

        } 
    };
    useEffect(() => {
        if(artwork&&!imageUrl)setImageUrl(artwork.ArtworkImageUrl);

    }, []);
    return (
        <>
            <form className='artwork-edit-form'>
                <label className="artwork-edit-title">Edit an Artwork</label>
                <label className={errors.name ? "error" : ""}>Name <span>{errors.name}</span>
                    <input
                        className="artwork-edit-input"
                        value={name}
                        placeholder={name}
                        onChange={(e) => setName(e.target.value)}>
                    </input>
                </label>
                <label className={errors.description ? "error" : ""}>Description <span>{errors.description}</span>
                    <textarea
                        className="artwork-edit-textarea"
                        required
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                        placeholder={`Enter description for this artwork`}>
                    </textarea>
                </label>
                <label className={errors.price ? "error" : ""}>Price <span>{errors.price}</span>
                    <input
                        value={price}
                        className="artwork-edit-input"
                        placeholder="Enter a price for this artwork"
                        required
                        onPaste={handlePaste}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => {
                            if(e.target.value === "") setPrice("0");
                            else setPrice(e.target.value[0] === "0" ? e.target.value.slice(1) : e.target.value);
                        }}>
                    </input>
                </label>

                <label className={errors.category ? "error category-label" : "category-label"} htmlFor="category">Category:
                    <select name="category"
                        className="artwork-edit-category"
                        required
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}>
                        <option value="japanese">Japanese</option>
                        <option value="chinese">Chinese</option>
                        <option value="pixel">Pixel</option>
                        <option value="fantasy">Fantasy</option>
                    </select>
                    <span>{errors.category}</span>
                </label>
                <div className="upload-box">

                    <div className='dotline'><img className="Uploadpic" /></div>
                    
                    <input
                        className='uploadButton'
                        type="file"
                        ref={fileRef}
                        accept=".jpg, .jpeg, .png"
                        onChange={updateFile} />

                    </div>

                <button className="submit-artwork-button" onClick={handleSubmit}>Update Artwork</button>
            </form>
        </>
    )
}

