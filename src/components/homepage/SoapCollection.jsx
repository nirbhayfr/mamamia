import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

const sections = [
	{
		id: "ghee",
		label: "Premium Ghee Soaps",
		accentColor: "#c07830",
		soaps: [
			{
				name: "Sandalwood, Turmeric & Saffron",
				tagline: "De-Tans · Ghee Soap",
				price: 249,
				bg: "#ede8de",
				badge: { label: "BESTSELLER", dark: false },
				img: "/saffron.png",
			},
			{
				name: "Manjishtha Ghee Soap",
				tagline: "Balances & Even-Tones",
				price: 249,
				bg: "#e8e0d8",
				badge: { label: "NEW", dark: true },
				img: "/ghee.png",
			},
			{
				name: "Jasmine Ghee Soap",
				tagline: "Nourishes & Moisturizes",
				price: 249,
				bg: "#ede0d8",
				badge: null,
				img: "/jasmine.png",
			},
		],
	},
	{
		id: "luxury",
		label: "Luxury Soaps",
		accentColor: "#8b1a4a",
		soaps: [
			{
				name: "Red Sandalwood & Lotus",
				tagline: "Brightens · Face & Body",
				price: 229,
				bg: "#ede8f0",
				badge: null,
				img: "/lotus.png",
			},

			{
				name: "Coffee & Cinnamon Latte",
				tagline: "Exfoliates & Softens",
				price: 229,
				bg: "#e8ddd4",
				badge: null,
				img: "/coffee.png",
			},
			{
				name: "Lavender & Coconut Milk",
				tagline: "Calms and Soothes",
				price: 229,
				bg: "#eae8f0",
				badge: null,
				img: "/lavender.png",
			},
		],
	},
	{
		id: "glycerin",
		label: "Glycerin Soaps",
		accentColor: "#2e7060",
		soaps: [
			{
				name: "Natural Brightening",
				tagline: "Glycerin · All Skin Types",
				price: 199,
				bg: "#ede0d4",
				badge: null,
				img: "/bright.png",
			},
			{
				name: "Charcoal Tea Tree",
				tagline: "Purifies · Normal to Oily",
				price: 229,
				bg: "#e8e8e8",
				badge: null,
				img: "/charcoal.png",
			},
			{
				name: "Rose Shea Butter",
				tagline: "Moisturizing · Normal to Dry Skin",
				price: 219,
				bg: "#f5d7dc",
				badge: null,
				img: "/rose.png",
			},
			{
				name: "Tomato Potato",
				tagline: "Skin Reviving · All Skin Types",
				price: 209,
				bg: "#f2d6c9",
				badge: null,
				img: "/tomato.png",
			},
			{
				name: "Turmeric Saffron",
				tagline: "Radiance Boost · All Skin Types",
				price: 239,
				bg: "#f6e2a6",
				badge: { label: "BESTSELLER", dark: false },
				img: "/turmeric.png",
			},
			{
				name: "Peony Goat Milk",
				tagline: "Nourishing · All Skin Types",
				price: 249,
				bg: "#f3e8ef",
				badge: null,
				img: "/milk.png",
			},
		],
	},
];

function SoapCard({ soap, isMobile }) {
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			{/* Image area */}
			<div
				style={{
					position: "relative",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: soap.bg,
					borderRadius: "4px",
					aspectRatio: "1 / 0.85",
					marginBottom: "12px",
				}}
			>
				<img
					src={soap.img}
					alt={soap.name}
					style={{
						width: isMobile ? "50%" : "55%",
						objectFit: "contain",
					}}
				/>
				{soap.badge && (
					<div
						style={{
							position: "absolute",
							top: "12px",
							left: "12px",
							backgroundColor: soap.badge.dark
								? "#1a1a18"
								: "var(--color-gold)",
							color: "var(--color-text-light)",
							letterSpacing: "0.1em",
							fontSize: "9px",
							fontWeight: 600,
							padding: "4px 8px",
						}}
					>
						{soap.badge.label}
					</div>
				)}
			</div>

			{/* Info */}
			<div
				style={{
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					gap: "8px",
				}}
			>
				<div style={{ flex: 1 }}>
					<h3
						style={{
							fontFamily: "var(--font-display)",
							color: "var(--color-text-dark)",
							fontSize: isMobile ? "16px" : "17px",
							fontWeight: 300,
							lineHeight: 1.3,
							margin: "0 0 4px",
						}}
					>
						{soap.name}
					</h3>
					<p
						style={{
							color: "var(--color-text-muted)",
							fontSize: "11px",
							letterSpacing: "0.02em",
							margin: "0 0 10px",
							fontWeight: 300,
						}}
					>
						{soap.tagline}
					</p>
					<p
						style={{
							color: "var(--color-text-dark)",
							fontSize: "15px",
							fontWeight: 600,
							margin: 0,
						}}
					>
						₹{soap.price}
					</p>
				</div>
				<button
					aria-label={`Add ${soap.name} to cart`}
					style={{
						width: "36px",
						height: "36px",
						flexShrink: 0,
						marginTop: "2px",
						border: "1.5px solid var(--color-divider)",
						borderRadius: "3px",
						background: "#fff",
						cursor: "pointer",
						color: "var(--color-text-dark)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						transition: "opacity 0.2s, background 0.2s",
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.background = "#f5f0f0";
						e.currentTarget.style.opacity = "0.8";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.background = "#fff";
						e.currentTarget.style.opacity = "1";
					}}
				>
					<ShoppingCart size={15} strokeWidth={1.5} />
				</button>
			</div>
		</div>
	);
}

export default function SoapCollection() {
	const getCols = () => {
		if (typeof window === "undefined") return 3;

		const w = window.innerWidth;

		if (w < 480) return 1;
		if (w < 768) return 2;
		return 3;
	};

	const [cols, setCols] = useState(getCols);

	useEffect(() => {
		const update = () => {
			setCols(getCols());
		};

		window.addEventListener("resize", update);

		return () => window.removeEventListener("resize", update);
	}, []);

	const isMobile = cols === 1;
	const isTablet = cols === 2;

	return (
		<section
			style={{
				backgroundColor: "var(--color-bg-primary)",
				fontFamily: "var(--font-body)",
				padding: isMobile
					? "40px 20px"
					: isTablet
						? "48px 28px"
						: "56px 48px",
			}}
		>
			{/* Page Header */}
			<div
				style={{
					display: "flex",
					alignItems: "flex-end",
					justifyContent: "space-between",
					marginBottom: isMobile ? "40px" : "56px",
					gap: "12px",
				}}
			>
				<div>
					<p
						style={{
							color: "var(--color-gold)",
							letterSpacing: "0.2em",
							fontSize: "11px",
							fontWeight: 500,
							marginBottom: "8px",
						}}
					>
						OUR SOAPS
					</p>
					<h2
						style={{
							fontFamily: "var(--font-display)",
							color: "var(--color-text-dark)",
							lineHeight: 1.1,
							fontSize: isMobile
								? "32px"
								: isTablet
									? "38px"
									: "48px",
							fontWeight: 300,
							margin: 0,
						}}
					>
						Everyday Luxury
					</h2>
				</div>
				<a
					href="#"
					style={{
						color: "var(--color-text-dark)",
						textDecoration: "none",
						letterSpacing: "0.18em",
						borderBottom:
							"1.5px solid var(--color-text-dark)",
						paddingBottom: "2px",
						fontSize: "11px",
						fontWeight: 600,
						whiteSpace: "nowrap",
						flexShrink: 0,
						transition: "opacity 0.2s",
					}}
					onMouseEnter={(e) =>
						(e.currentTarget.style.opacity = "0.6")
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.opacity = "1")
					}
				>
					VIEW ALL →
				</a>
			</div>

			{/* Subsections */}
			{sections.map((section, si) => (
				<div
					key={section.id}
					style={{
						marginBottom:
							si < sections.length - 1 ? "72px" : 0,
					}}
				>
					{/* Section header */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "16px",
							marginBottom: "28px",
						}}
					>
						{/* Dot + label */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "10px",
								flexShrink: 0,
							}}
						>
							<span
								style={{
									width: "10px",
									height: "10px",
									borderRadius: "50%",
									// background: section.accentColor,
									background:
										"var(--color-text-gold)",
									flexShrink: 0,
									display: "inline-block",
								}}
							/>
							<span
								style={{
									// fontSize: "20px",
									fontWeight: 600,
									letterSpacing: "0.25em",
									textTransform: "uppercase",
									color: "var(--color-text-gold)",
									// color: section.accentColor,
									whiteSpace: "nowrap",
									fontFamily: "var(--font-display)",
								}}
								className="max-sm:text-sm text-xl"
							>
								{section.label}
							</span>
						</div>

						{/* Rule */}
						<div
							style={{
								flex: 1,
								height: "1px",
								background: "var(--color-divider)",
							}}
						/>

						{/* Count */}
						<span
							style={{
								fontSize: "10px",
								color: "var(--color-text-muted)",
								letterSpacing: "0.1em",
								flexShrink: 0,
							}}
						>
							{section.soaps.length} products
						</span>
					</div>

					{/* Grid */}
					<div
						style={{
							display: "grid",
							gridTemplateColumns: `repeat(${cols}, 1fr)`,
							gap: isMobile ? "32px 16px" : "28px 20px",
						}}
					>
						{section.soaps.map((soap) => (
							<SoapCard
								key={soap.name}
								soap={soap}
								isMobile={isMobile}
							/>
						))}
					</div>
				</div>
			))}
		</section>
	);
}
