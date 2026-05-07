import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";

const soaps = [
	{
		name: "JASMINE GHEE",
		color: "var(--color-soap-jasmine)",
		img: "/jasmine.png",
		bestseller: false,
	},
	{
		name: "SANDALWOOD & SAFFRON",
		color: "var(--color-soap-sandalwood)",
		img: "/saffron.png",
		bestseller: true,
	},
	{
		name: "RED SANDALWOOD & LOTUS",
		color: "var(--color-soap-red-sandalwood)",
		img: "/lotus.png",
		bestseller: false,
	},
	{
		name: "CHARCOAL TEA TREE",
		color: "var(--color-soap-charcoal)",
		img: "/charcoal.png",
		bestseller: false,
	},
];

const tickerItems = [
	"NO SULFATES",
	"NO PARABENS",
	"COLD PROCESSED",
	"HANDCRAFTED IN INDIA",
	"GH AWARD WINNER",
];

export default function HeroSection() {
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);

	useEffect(() => {
		const update = () => {
			setIsMobile(window.innerWidth < 640);
			setIsTablet(
				window.innerWidth >= 640 && window.innerWidth < 1024,
			);
		};
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	return (
		<div
			style={{ fontFamily: "var(--font-body)" }}
			className="flex flex-col min-h-screen"
		>
			{/* Hero Body */}
			<div
				className="flex flex-1"
				style={{
					backgroundColor: "var(--color-bg-primary)",
					flexDirection: isMobile || isTablet ? "column" : "row",
				}}
			>
				{/* Left Panel */}
				<div
					style={{
						flex: isMobile || isTablet ? "none" : "0 0 50%",
						backgroundColor: "var(--color-bg-primary)",
						padding: isMobile
							? "40px 24px 36px"
							: isTablet
								? "48px 40px"
								: "0 64px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: isMobile ? "center" : "flex-start",
						textAlign: isMobile ? "center" : "left",
					}}
				>
					{/* Eyebrow */}
					<p
						style={{
							color: "var(--color-gold)",
							letterSpacing: "0.2em",
							fontSize: "11px",
							fontWeight: 500,
							marginBottom: "20px",
						}}
					>
						COLD PROCESSED · HANDCRAFTED
					</p>

					{/* Headline */}
					<h1
						style={{
							fontFamily: "var(--font-display)",
							color: "var(--color-text-dark)",
							lineHeight: 1.05,
							marginBottom: "1.25rem",
							fontSize: isMobile
								? "42px"
								: isTablet
									? "52px"
									: "60px",
							fontWeight: 300,
						}}
					>
						Skin rituals,
						<br />
						<em
							style={{
								fontStyle: "italic",
								fontWeight: 300,
								color: "#423427",
							}}
						>
							crafted by hand
						</em>
					</h1>

					{/* Body */}
					<p
						style={{
							color: "var(--color-text-muted)",
							fontSize: "14px",
							lineHeight: 1.75,
							marginBottom: "36px",
							maxWidth: isMobile ? "100%" : "280px",
							fontWeight: 300,
						}}
					>
						Ancient ingredients, modern formulas. Each bar is
						cold-processed to preserve every drop of
						nourishment.
					</p>

					{/* CTAs */}
					<div
						style={{
							display: "flex",
							gap: "12px",
							flexDirection: isMobile ? "column" : "row",
							width: isMobile ? "100%" : "auto",
						}}
					>
						<button
							style={{
								backgroundColor:
									"var(--color-btn-primary-bg)",
								color: "var(--color-btn-primary-text)",
								border: "none",
								cursor: "pointer",
								letterSpacing: "0.15em",
								fontSize: "11px",
								fontWeight: 600,
								padding: isMobile
									? "16px 24px"
									: "16px 32px",
								width: isMobile ? "100%" : "auto",
								transition: "opacity 0.2s",
								fontFamily: "var(--font-body)",
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.opacity = "0.82")
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.opacity = "1")
							}
						>
							SHOP ALL SOAPS
						</button>
						<button
							style={{
								backgroundColor: "transparent",
								color: "var(--color-btn-outline-text)",
								border: "1.5px solid var(--color-btn-outline-border)",
								cursor: "pointer",
								letterSpacing: "0.15em",
								fontSize: "11px",
								fontWeight: 600,
								padding: isMobile
									? "16px 24px"
									: "16px 32px",
								width: isMobile ? "100%" : "auto",
								transition: "opacity 0.2s",
								fontFamily: "var(--font-body)",
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.opacity = "0.6")
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.opacity = "1")
							}
						>
							FIND MY MATCH
						</button>
					</div>
				</div>

				{/* Right Panel — Soap Grid */}
				<div
					style={{
						flex: 1,
						backgroundColor: "var(--color-bg-secondary)",
						borderLeft:
							isMobile || isTablet
								? "none"
								: "1px solid var(--color-divider)",
						borderTop:
							isMobile || isTablet
								? "1px solid var(--color-divider)"
								: "none",
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
					}}
				>
					{soaps.map((soap, idx) => (
						<div
							key={soap.name}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								position: "relative",
								borderRight:
									idx % 2 === 0
										? "1px solid var(--color-divider)"
										: "none",
								borderBottom:
									idx < 2
										? "1px solid var(--color-divider)"
										: "none",
								padding: isMobile
									? "20px 8px"
									: "24px 8px",
								minHeight: isMobile
									? "140px"
									: isTablet
										? "180px"
										: "auto",
							}}
						>
							<img
								src={soap.img}
								alt={soap.name}
								style={{
									width: isMobile
										? "90px"
										: isTablet
											? "130px"
											: "192px",
									objectFit: "contain",
								}}
							/>
							{soap.bestseller && (
								<div
									style={{
										position: "absolute",
										top: "12px",
										right: "12px",
										backgroundColor:
											"var(--color-badge-bg)",
										color: "var(--color-badge-text)",
										letterSpacing: "0.12em",
										fontSize: "9px",
										fontWeight: 600,
										padding: "4px 8px",
									}}
								>
									BESTSELLER
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Ticker Bar */}
			<div
				style={{
					backgroundColor: "var(--color-ticker-bg)",
					overflow: "hidden",
					padding: "12px 0",
					display: "flex",
				}}
			>
				<div
					style={{
						display: "flex",
						whiteSpace: "nowrap",
						animation: "ticker 18s linear infinite",
						color: "var(--color-ticker-text)",
					}}
				>
					{[
						...tickerItems,
						...tickerItems,
						...tickerItems,
						...tickerItems,
					].map((item, i) => (
						<span
							key={i}
							style={{
								letterSpacing: "0.18em",
								fontSize: "11px",
								fontWeight: 500,
								margin: "0 24px",
							}}
						>
							{item}
							<span
								style={{
									color: "var(--color-gold)",
									margin: "0 24px",
								}}
							>
								·
							</span>
						</span>
					))}
				</div>
			</div>

			<style>{`
				@keyframes ticker {
					0%   { transform: translateX(0); }
					100% { transform: translateX(-50%); }
				}
			`}</style>
		</div>
	);
}
