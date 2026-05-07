// Soap color swatches — replace src with actual product images
const soaps = [
	{
		color: "#2e5540",
		img: "/jasmine.png",
		rotate: "-8deg",
		zIndex: 1,
		top: "20px",
		left: "0px",
	},
	{
		color: "#b8702e",
		img: "/saffron.png",
		rotate: "-2deg",
		zIndex: 2,
		top: "0px",
		left: "60px",
	},
	{
		color: "#8b1a4a",
		img: "/lotus.png",
		rotate: "5deg",
		zIndex: 3,
		top: "30px",
		left: "120px",
	},
	{
		color: "#1e1e1e",
		img: "/charcoal.png",
		rotate: "12deg",
		zIndex: 4,
		top: "10px",
		left: "190px",
	},
];

export default function RitualSet() {
	return (
		<section
			style={{
				backgroundColor: "#eae5db",
				fontFamily: "var(--font-body)",
				padding: "72px 48px",
			}}
		>
			<div
				style={{
					alignItems: "center",
					gap: "64px",
					maxWidth: "960px",
					margin: "0 auto",
				}}
				className="grid grid-cols-1 md:grid-cols-2"
			>
				{/* Left — stacked soap visual */}
				<div
					className="mx-auto md:mx-0"
					style={{
						position: "relative",
						height: "260px",
						width: "100%",
						maxWidth: "320px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{soaps.map((soap, i) => (
						<div
							key={i}
							style={{
								position: "absolute",

								borderRadius: "10px",
								backgroundColor: soap.color,
								transform: `rotate(${soap.rotate})`,
								zIndex: soap.zIndex,
								top: soap.top,
								left: soap.left,
								overflow: "hidden",
								boxShadow:
									"4px 6px 18px rgba(0,0,0,0.18)",
								padding: "10px",
								gap: "5px",
							}}
							className="size-26 md:size-30"
						>
							<img
								src={soap.img}
								alt=""
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
									// mixBlendMode: "multiply",
									opacity: 0.85,
								}}
								onError={(e) => {
									e.target.style.display = "none";
								}}
							/>
						</div>
					))}
				</div>

				{/* Right — content */}
				<div className="flex flex-col items-center text-center md:items-start md:text-left">
					<p
						style={{
							fontSize: "11px",
							fontWeight: 500,
							letterSpacing: "0.22em",
							color: "var(--color-gold)",
							textTransform: "uppercase",
							marginBottom: "12px",
						}}
					>
						Curated Bundle
					</p>

					<h2
						style={{
							fontFamily: "var(--font-display)",
							fontSize: "52px",
							fontWeight: 300,
							color: "var(--color-text-dark)",
							lineHeight: 1.05,
							margin: "0 0 16px",
							letterSpacing: "-0.5px",
						}}
					>
						The Ritual Set
					</h2>

					<p
						style={{
							fontSize: "14px",
							fontWeight: 300,
							color: "var(--color-text-muted)",
							lineHeight: 1.7,
							margin: "0 0 28px",
							maxWidth: "320px",
						}}
					>
						Our 4 bestselling bars in one gift-ready box.
						<br />
						The perfect skincare starter kit.
					</p>

					{/* Pricing */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "14px",
							marginBottom: "28px",
						}}
					>
						<span
							style={{
								fontFamily: "var(--font-display)",
								fontSize: "38px",
								fontWeight: 400,
								color: "var(--color-text-dark)",
								letterSpacing: "-0.5px",
							}}
						>
							₹799
						</span>
						<span
							style={{
								fontSize: "16px",
								color: "var(--color-text-muted)",
								fontWeight: 300,
								textDecoration: "line-through",
							}}
						>
							₹996
						</span>
						<span
							style={{
								fontSize: "11px",
								fontWeight: 600,
								letterSpacing: "0.06em",
								backgroundColor: "var(--color-gold)",
								color: "#fff",
								padding: "5px 12px",
								borderRadius: "2px",
							}}
						>
							Save 20%
						</span>
					</div>

					{/* CTA */}
					<button
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
							maxWidth: "340px",
							backgroundColor: "var(--color-text-dark)",
							color: "var(--color-bg-primary)",
							fontFamily: "var(--font-body)",
							fontSize: "11px",
							fontWeight: 500,
							letterSpacing: "0.22em",
							textTransform: "uppercase",
							padding: "18px 32px",
							border: "none",
							borderRadius: "2px",
							cursor: "pointer",
							transition: "opacity 0.2s",
						}}
						onMouseEnter={(e) =>
							(e.target.style.opacity = "0.82")
						}
						onMouseLeave={(e) =>
							(e.target.style.opacity = "1")
						}
					>
						Add Bundle to Cart
					</button>
				</div>
			</div>
		</section>
	);
}
