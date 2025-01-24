import { QRCodeSVG } from 'qrcode.react';
import { useRef, useState } from 'react';
import styles from './App.module.css';
import { v4 as uuidv4 } from 'uuid';

function generateRandomName() {
	const randomName = uuidv4();
	return `qrcode_${randomName}.svg`;
}
function App() {
	const [inputValue, setInputValue] = useState('');
	const qrCodeRef = useRef(null);

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleDownload = () => {
		const svgElement = qrCodeRef.current;
		const serializer = new XMLSerializer();
		const svgString = serializer.serializeToString(svgElement);
		const blob = new Blob([svgString], { type: 'image/svg+xml' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = generateRandomName();
		link.click();
	};

	return (
		<main className={styles.main}>
			<div className={styles.card}>
				<h1>Dynamic QR Code Generator</h1>
				<div className={styles.input}>
					<label htmlFor="text">Enter text for QR code:</label>
					<input
						name="text"
						type="text"
						value={inputValue}
						onChange={handleChange}
						placeholder="www.example.com"
					/>
				</div>
				{inputValue && (
					<div className={styles.qrcodeWrapper}>
						<QRCodeSVG
							value={inputValue}
							size={256}
							level="H"
							ref={qrCodeRef}
						/>
						<button className={styles.download} onClick={handleDownload}>
							Download
						</button>
					</div>
				)}
			</div>
		</main>
	);
}

export default App;
