import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

const soaps = [
	{
		name: "Sandalwood, Turmeric & Saffron",
		tagline: "De-Tans · Ghee Soap",
		price: 249,
		color: "#b8702e",
		bg: "#ede8de",
		badge: { label: "BESTSELLER", dark: false },
		img: "/saffron.png",
	},
	{
		name: "Manjishtha Ghee Soap",
		tagline: "Balances & Even-Tones",
		price: 249,
		color: "#5c2e1a",
		bg: "#e8e0d8",
		badge: { label: "NEW", dark: true },
		img: "/ghee.png",
	},
	{
		name: "Red Sandalwood & Lotus",
		tagline: "Brightens · Face & Body",
		price: 229,
		color: "#8b1a4a",
		bg: "#ede8f0",
		badge: null,
		img: "/lotus.png",
	},
	{
		name: "Charcoal Tea Tree",
		tagline: "Purifies · Normal to Oily",
		price: 229,
		color: "#1e1e1e",
		bg: "#e8e8e8",
		badge: null,
		img: "/charcoal.png",
	},
	{
		name: "Jasmine Ghee Soap",
		tagline: "Nourishes & Moisturizes",
		price: 249,
		color: "#2e5540",
		bg: "#ede0d8",
		badge: null,
		img: "/jasmine.png",
	},
	{
		name: "Coffee & Cinnamon Latte",
		tagline: "Exfoliates & Softens",
		price: 229,
		color: "#4a2010",
		bg: "#e8ddd4",
		badge: null,
		img: "/coffee.png",
	},
	{
		name: "Lavender & Coconut Milk",
		tagline: "Calms and Soothes",
		price: 229,
		color: "#4a4a8a",
		bg: "#eae8f0",
		badge: null,
		img: "/lavender.png",
	},
	{
		name: "Natural Brightening",
		tagline: "Glycerin · All Skin Types",
		price: 199,
		color: "#c07830",
		bg: "#ede0d4",
		badge: null,
		img: "/bright.png",
	},
];

export default function SoapCollection() {
	const [cols, setCols] = useState(4);

	useEffect(() => {
		const update = () => {
			const w = window.innerWidth;
			if (w < 480) setCols(1);
			else if (w < 768) setCols(2);
			else if (w < 1024) setCols(3);
			else setCols(4);
		};
		update();
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
			{/* Header */}
			<div
				style={{
					display: "flex",
					alignItems: "flex-end",
					justifyContent: "space-between",
					marginBottom: isMobile ? "28px" : "36px",
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
						The Full Collection
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

			{/* Grid */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${cols}, 1fr)`,
					gap: isMobile ? "32px 16px" : "28px 20px",
				}}
			>
				{soaps.map((soap) => (
					<div
						key={soap.name}
						style={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						{/* Card image */}
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
									width: isMobile ? "60%" : "75%",
									objectFit: "contain",
								}}
							/>
							{soap.badge && (
								<div
									style={{
										position: "absolute",
										top: "12px",
										left: "12px",
										backgroundColor: soap.badge
											.dark
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

						{/* Info row */}
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
										fontFamily:
											"var(--font-display)",
										color: "var(--color-text-dark)",
										fontSize: isMobile
											? "16px"
											: "17px",
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

							{/* Add to Cart */}
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
									transition:
										"opacity 0.2s, background 0.2s",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background =
										"#f5f0f0";
									e.currentTarget.style.opacity =
										"0.8";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background =
										"#fff";
									e.currentTarget.style.opacity =
										"1";
								}}
							>
								<ShoppingCart
									size={15}
									strokeWidth={1.5}
								/>
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
