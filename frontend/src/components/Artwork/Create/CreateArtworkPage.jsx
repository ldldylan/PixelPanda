import { createArtwork } from '../../../store/artworks'
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchArtworks } from '../../../store/artworks';
import "./CreateArtwork.css"

export default function CreateArtworkPage({ onClose, updateShouldFetchArtworks }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("0")
    const [image, setImage] = useState([]);
    const [imageUrl, setImageUrl] = useState([]);
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        price: "",
        category: ""
    });
    const fileRef = useRef(null);
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user)

    // useEffect(() => {
    //     dispatch(fetchArtworks())
    // }, [dispatch])

    const handleChange = (event) => {
        setCategory(event.target.value);
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
        // console.log(value);
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

    const updateFile = async e => {
        const file = e.target.files[0];

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
    }
    useEffect(() => {

    }, [image, imageUrl]);
    return (
        <>
            <form className="artwork-edit-form">

                <div className="artwork-edit-title">
                    <label>Submit an Artwork</label>
                </div>
                <label className={errors.name ? "error" : ""}>Name <span>{errors.name}</span>
                    <input
                        value={name}
                        className="artwork-edit-input"
                        placeholder="Enter a name for this artwork"
                        required
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

                
                
                <label className= {errors.category ? "error category-label" : "category-label"} htmlFor="category">Category:
                    <select name="category"
                        className="artwork-edit-category"
                        required
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}>
                        <option value="" disabled defaultValue>Select a category</option>
                        <option value="japanese">Japanese</option>
                        <option value="chinese">Chinese</option>
                        <option value="pixel">Pixel</option>
                        <option value="fantasy">Fantasy</option>
                    </select>
                    <span>{errors.category}</span>
                </label>

                <div className="upload-box">
                    {/* Image to Upload */}
                    <div className='dotline'><img className="Uploadpic" /></div>
                    <input
                        className='uploadButton'
                        type="file"
                        ref={fileRef}
                        accept=".jpg, .jpeg, .png"
                        onChange={updateFile} />
                    <p><i className="fa-solid fa-cloud-arrow-up"></i></p>
                    <p className='uploadins'>click to upload</p>
                    <p className='recommend'>We recommend using high-quality .jpg files under 20MB</p>
                </div>
                
                <button className="submit-artwork-button" onClick={handleSubmit}>Upload New Artwork</button>

            </form>
        </>
    )
}

