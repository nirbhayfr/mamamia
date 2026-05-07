import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const skinTypes = [
	{ id: "dry", label: "DRY SKIN" },
	{ id: "oily", label: "OILY SKIN" },
	{ id: "combination", label: "COMBINATION" },
	{ id: "sensitive", label: "SENSITIVE" },
	{ id: "normal", label: "NORMAL" },
];

const recommendations = {
	dry: [
		{
			name: "Jasmine Ghee Soap",
			match: 98,
			desc: "Deeply Nourishing",
			color: "#2e5540",
			img: "/jasmine.png",
		},
		{
			name: "Lavender & Coconut Milk",
			match: 94,
			desc: "Calms & Soothes",
			color: "#4a4a8a",
			img: "/lavender.png",
		},
		{
			name: "Rose Shea Butter",
			match: 91,
			desc: "Rich Moisture",
			color: "#c0305a",
			img: "/rose.png",
		},
	],
	oily: [
		{
			name: "Charcoal Tea Tree",
			match: 97,
			desc: "Deep Purifying",
			color: "#1e1e1e",
			img: "/charcoal.png",
		},
		{
			name: "Manjishtha Ghee Soap",
			match: 93,
			desc: "Balances & Even-Tones",
			color: "#5c2e1a",
			img: "/ghee.png",
		},
		{
			name: "Coffee & Cinnamon Latte",
			match: 89,
			desc: "Exfoliates & Softens",
			color: "#4a2010",
			img: "/coffee.png",
		},
	],
	combination: [
		{
			name: "Sandalwood, Turmeric & Saffron",
			match: 96,
			desc: "De-Tans · Balances",
			color: "#b8702e",
			img: "/saffron.png",
		},
		{
			name: "Charcoal Tea Tree",
			match: 91,
			desc: "Purifies Oily Zones",
			color: "#1e1e1e",
			img: "/charcoal.png",
		},
		{
			name: "Jasmine Ghee Soap",
			match: 87,
			desc: "Nourishes Dry Zones",
			color: "#2e5540",
			img: "/jasmine.png",
		},
	],
	sensitive: [
		{
			name: "Lavender & Coconut Milk",
			match: 98,
			desc: "Ultra Calming",
			color: "#4a4a8a",
			img: "/lavender.png",
		},
		{
			name: "Natural Brightening",
			match: 93,
			desc: "Glycerin · Gentle",
			color: "#c07830",
			img: "/bright.png",
		},
		{
			name: "Jasmine Ghee Soap",
			match: 90,
			desc: "Nourishes & Soothes",
			color: "#2e5540",
			img: "/jasmine.png",
		},
	],
	normal: [
		{
			name: "Red Sandalwood & Lotus",
			match: 95,
			desc: "Brightens · Glows",
			color: "#8b1a4a",
			img: "/lotus.png",
		},
		{
			name: "Sandalwood, Turmeric & Saffron",
			match: 92,
			desc: "De-Tans · Refines",
			color: "#b8702e",
			img: "/saffron.png",
		},
		{
			name: "Coffee & Cinnamon Latte",
			match: 88,
			desc: "Exfoliates & Softens",
			color: "#4a2010",
			img: "/coffee.png",
		},
	],
};

export default function SkinFinder() {
	const [selected, setSelected] = useState("dry");
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const update = () => setIsMobile(window.innerWidth < 768);
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	const recs = recommendations[selected];
	const skinLabel = skinTypes.find((s) => s.id === selected)?.label;

	return (
		<section
			style={{
				backgroundColor: "var(--color-bg-dark)",
				fontFamily: "var(--font-body)",
				padding: isMobile ? "48px 20px" : "64px 48px",
				display: "flex",
				flexDirection: isMobile ? "column" : "row",
				gap: isMobile ? "40px" : "48px",
				alignItems: isMobile ? "stretch" : "center",
				minHeight: isMobile ? "auto" : "480px",
			}}
		>
			{/* Left */}
			<div style={{ flex: 1, maxWidth: isMobile ? "100%" : "480px" }}>
				<p
					style={{
						color: "var(--color-gold)",
						letterSpacing: "0.22em",
						fontSize: "11px",
						fontWeight: 500,
						marginBottom: "16px",
					}}
				>
					SKIN FINDER
				</p>

				<h2
					style={{
						fontFamily: "var(--font-display)",
						color: "#f5f0e8",
						fontSize: isMobile ? "36px" : "46px",
						fontWeight: 300,
						lineHeight: 1.1,
						margin: "0 0 16px",
					}}
				>
					Find your perfect soap
				</h2>

				<p
					style={{
						color: "rgba(245,240,232,0.55)",
						fontSize: "14px",
						lineHeight: 1.75,
						margin: "0 0 28px",
						fontWeight: 300,
						maxWidth: "360px",
					}}
				>
					Answer a few quick questions and we'll match you with
					the ideal bar for your skin.
				</p>

				{/* Skin Type Buttons */}
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: "10px",
						marginBottom: "32px",
					}}
				>
					{skinTypes.map((type) => (
						<button
							key={type.id}
							onClick={() => setSelected(type.id)}
							style={{
								padding: isMobile
									? "10px 16px"
									: "12px 20px",
								fontSize: "10px",
								fontWeight: 600,
								letterSpacing: "0.14em",
								cursor: "pointer",
								fontFamily: "var(--font-body)",
								transition: "all 0.2s",
								backgroundColor:
									selected === type.id
										? "var(--color-gold)"
										: "transparent",
								color:
									selected === type.id
										? "#1a1a18"
										: "rgba(245,240,232,0.75)",
								border:
									selected === type.id
										? "1.5px solid var(--color-gold)"
										: "1.5px solid rgba(245,240,232,0.25)",
							}}
						>
							{type.label}
						</button>
					))}
				</div>

				{/* CTA */}
				<button
					style={{
						display: "flex",
						alignItems: "center",
						gap: "10px",
						padding: isMobile ? "14px 24px" : "16px 32px",
						fontSize: "11px",
						fontWeight: 600,
						letterSpacing: "0.18em",
						backgroundColor: "var(--color-gold)",
						color: "#1a1a18",
						border: "none",
						cursor: "pointer",
						fontFamily: "var(--font-body)",
						transition: "opacity 0.2s",
						width: isMobile ? "100%" : "auto",
						justifyContent: isMobile
							? "center"
							: "flex-start",
					}}
					onMouseEnter={(e) =>
						(e.currentTarget.style.opacity = "0.82")
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.opacity = "1")
					}
				>
					FIND MY MATCH
					<ArrowRight size={14} strokeWidth={2} />
				</button>
			</div>

			{/* Right — Recommendations Panel */}
			<div
				style={{
					flex: 1,
					maxWidth: isMobile ? "100%" : "520px",
					backgroundColor: "rgba(255,255,255,0.05)",
					border: "1px solid rgba(245,240,232,0.1)",
					borderRadius: "2px",
					padding: isMobile ? "20px 16px" : "28px",
					display: "flex",
					flexDirection: "column",
					gap: "12px",
				}}
			>
				{/* Panel Header */}
				<p
					style={{
						color: "rgba(245,240,232,0.4)",
						letterSpacing: "0.2em",
						fontSize: "10px",
						fontWeight: 500,
						marginBottom: "4px",
					}}
				>
					RECOMMENDED FOR {skinLabel}
				</p>

				{/* Recommendation Cards */}
				{recs.map((rec) => (
					<div
						key={rec.name}
						style={{
							display: "flex",
							alignItems: "center",
							gap: isMobile ? "12px" : "16px",
							padding: isMobile ? "12px" : "16px",
							backgroundColor: "rgba(255,255,255,0.05)",
							border: "1px solid rgba(245,240,232,0.08)",
							borderRadius: "2px",
							cursor: "pointer",
							transition: "filter 0.2s",
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.filter =
								"brightness(1.12)")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.filter =
								"brightness(1)")
						}
					>
						{/* Swatch */}
						<div
							style={{
								flexShrink: 0,
								width: isMobile ? "48px" : "60px",
								height: isMobile ? "48px" : "60px",
								backgroundColor: rec.color,
								borderRadius: "6px",
								overflow: "hidden",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<img
								src={rec.img}
								alt={rec.name}
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
								onError={(e) => {
									e.target.style.display = "none";
								}}
							/>
						</div>

						{/* Info */}
						<div style={{ flex: 1, minWidth: 0 }}>
							<h4
								style={{
									fontFamily: "var(--font-display)",
									color: "#f5f0e8",
									fontSize: isMobile
										? "16px"
										: "18px",
									fontWeight: 300,
									lineHeight: 1.2,
									margin: "0 0 4px",
									whiteSpace: isMobile
										? "normal"
										: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{rec.name}
							</h4>
							<p
								style={{
									color: "var(--color-gold)",
									fontSize: "11px",
									letterSpacing: "0.04em",
									margin: 0,
									fontWeight: 400,
								}}
							>
								{rec.match}% Match · {rec.desc}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
