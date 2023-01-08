
import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import defaultAvatar from "../../assets/images/profile/default_avatar.png"
import './index.scss';

function dataURLtoFile(dataurl, filename) {
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
}

export default function Crop({ onChangeprofilepic }) {
	const [src, setSrc] = useState(null);
	const [crop, setCrop] = useState({ aspect: 1 / 1 });
	const [image, setImage] = useState(null);
	const [output, setOutput] = useState(null);

	const selectImage = (e) => {
		setSrc(URL.createObjectURL(e.target.files[0]));
	};



	const cropImageNow = (e) => {
		e.preventDefault();
		const canvas = document.createElement('canvas');
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		canvas.width = crop.width;
		canvas.height = crop.height;
		const ctx = canvas.getContext('2d');

		const pixelRatio = window.devicePixelRatio;
		canvas.width = crop.width * pixelRatio;
		canvas.height = crop.height * pixelRatio;
		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		ctx.imageSmoothingQuality = 'high';

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height,
		);

		const base64Image = canvas.toDataURL('image/jpeg');
		console.log(base64Image, "canvas");
		const file = dataURLtoFile(base64Image, 'filename.png');
		onChangeprofilepic(file);
		setOutput(base64Image);
	};



	return (
		<div style={{ display: "flex", justifyContent: "flex-start" }}>
			{!src &&
			<div style={{marginTop:7}} >
				<input type="file" id="files" style={{ visibility: "hidden", width: 1 }} accept="image/*"
					onChange={selectImage} />
				<label for="files" className='label1 '>Upload Logo</label>
			</div>
			
			}
			{src && (<>
				<div>
			<button className='Post' onClick={cropImageNow}>Crop</button>
			</div>
			<div  style={{ height: 170}}>

				<div className='crop'>
					<ReactCrop src={src} onImageLoaded={setImage}
						crop={crop} onChange={setCrop} circularCrop="true" style={{borderRadius:20}}/>
				</div>


			</div>

			</>)}
			{src &&
				<div className='left-content'>
					<div  className="prev-img">
						<img src={output ? output : defaultAvatar} />
					</div>
					<div className="preview">
					     <p >Preview</p>
					</div>
				</div>
			}

		</div>
	);
}


