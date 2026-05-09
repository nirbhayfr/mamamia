// import { Instagram, Twitter } from "lucide-react";
import { useState } from "react";

const footerLinks = {
	SHOP: [
		"All Soaps",
		"Ghee Range",
		"Glycerin Range",
		"Bundles",
		"Gift Sets",
	],
	LEARN: ["Our Story", "Ingredients", "Cold Process", "Journal"],
	HELP: ["Contact Us", "Shipping", "Returns", "FAQ"],
};

function PaymentBadge({ label }) {
	return (
		<div
			style={{
				border: "1px solid #3a3a38",
				borderRadius: "3px",
				padding: "5px 10px",
				fontSize: "10px",
				fontWeight: 600,
				letterSpacing: "0.08em",
				color: "#a0998e",
			}}
		>
			{label}
		</div>
	);
}

export default function Footer() {
	const [email, setEmail] = useState("");
	const [subscribed, setSubscribed] = useState(false);

	const handleSubscribe = () => {
		if (email.trim()) setSubscribed(true);
	};

	return (
		<footer
			style={{
				backgroundColor: "#1a1a18",
				fontFamily: "var(--font-body)",
				color: "#f5f0e8",
			}}
		>
			{/* Newsletter */}
			<div
				style={{
					borderBottom: "1px solid #2e2e2c",
					padding: "72px 48px 64px",
					textAlign: "center",
				}}
			>
				<p
					style={{
						fontSize: "11px",
						fontWeight: 500,
						letterSpacing: "0.22em",
						color: "var(--color-gold)",
						textTransform: "uppercase",
						marginBottom: "16px",
					}}
				>
					Stay in the Loop
				</p>
				<h2
					style={{
						fontFamily: "var(--font-display)",
						fontSize: "52px",
						fontWeight: 300,
						color: "#f5f0e8",
						lineHeight: 1.05,
						margin: "0 0 16px",
						letterSpacing: "-0.5px",
					}}
				>
					The MamaMia Journal
				</h2>
				<p
					style={{
						fontSize: "14px",
						fontWeight: 300,
						color: "#a0998e",
						margin: "0 0 36px",
						lineHeight: 1.7,
					}}
				>
					Skin rituals, ingredient stories &amp; member-only
					offers — straight to your inbox.
				</p>

				{subscribed ? (
					<p
						style={{
							fontSize: "14px",
							color: "var(--color-gold)",
							fontWeight: 300,
							letterSpacing: "0.04em",
						}}
					>
						✓ You're on the list. Welcome to the journal.
					</p>
				) : (
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							maxWidth: "560px",
							width: "100%",
							margin: "0 auto",
							border: "1px solid #3a3a38",
							borderRadius: "2px",
							overflow: "hidden",
							flexWrap: "wrap",
						}}
					>
						<input
							type="email"
							placeholder="your@email.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onKeyDown={(e) =>
								e.key === "Enter" && handleSubscribe()
							}
							style={{
								flex: "1 1 260px",
								minWidth: 0,
								background: "#242422",
								border: "none",
								outline: "none",
								padding: "18px 24px",
								fontSize: "14px",
								fontWeight: 300,
								color: "#f5f0e8",
								fontFamily: "var(--font-body)",
							}}
						/>
						<button
							onClick={handleSubscribe}
							style={{
								background: "var(--color-gold)",
								border: "none",
								padding: "18px 32px",
								fontSize: "11px",
								fontWeight: 600,
								letterSpacing: "0.18em",
								textTransform: "uppercase",
								color: "#fff",
								fontFamily: "var(--font-body)",
								cursor: "pointer",
								transition: "opacity 0.2s",
								whiteSpace: "nowrap",
								width: "100%",
								flex: "0 0 auto",
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.opacity = "0.85")
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.opacity = "1")
							}
						>
							Subscribe
						</button>
					</div>
				)}
			</div>

			{/* Links grid */}
			<div
				style={{
					padding: "56px 48px 48px",

					gap: "40px",
					borderBottom: "1px solid #2e2e2c",
				}}
				className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr]"
			>
				{/* Brand col */}
				<div>
					<p
						style={{
							fontFamily: "var(--font-display)",
							fontSize: "28px",
							fontWeight: 300,
							color: "#f5f0e8",
							margin: "0 0 14px",
							letterSpacing: "-0.3px",
						}}
					>
						<img
							src="/logo.png"
							alt="logo"
							className="w-24"
						/>
					</p>
					<p
						style={{
							fontSize: "13px",
							fontWeight: 300,
							color: "#a0998e",
							lineHeight: 1.7,
							margin: "0 0 24px",
							maxWidth: "220px",
						}}
					>
						Nature's Care, Naturally.
						<br />
						Handcrafted soaps made with intention and ancient
						wisdom.
					</p>
					<div style={{ display: "flex", gap: "10px" }}>
						{[
							{
								// icon: (
								// 	<Instagram
								// 		size={15}
								// 		strokeWidth={1.5}
								// 	/>
								// ),
								label: "Instagram",
							},
							{
								// icon: (
								// 	// <
								// 	// 	size={15}
								// 	// 	strokeWidth={1.5}
								// 	// />
								// ),
								label: "Facebook",
							},
							{
								// icon: (
								// 	<Twitter
								// 		size={15}
								// 		strokeWidth={1.5}
								// 	/>
								// ),
								label: "Twitter",
							},
						].map(({ icon, label }) => (
							<button
								key={label}
								aria-label={label}
								style={{
									width: "36px",
									height: "36px",
									border: "1px solid #3a3a38",
									borderRadius: "3px",
									background: "transparent",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									color: "#a0998e",
									cursor: "pointer",
									transition:
										"border-color 0.2s, color 0.2s",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.borderColor =
										"var(--color-gold)";
									e.currentTarget.style.color =
										"var(--color-gold)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.borderColor =
										"#3a3a38";
									e.currentTarget.style.color =
										"#a0998e";
								}}
							>
								{icon}
							</button>
						))}
					</div>
				</div>

				{/* Link columns */}
				{Object.entries(footerLinks).map(([heading, links]) => (
					<div key={heading}>
						<p
							style={{
								fontSize: "11px",
								fontWeight: 600,
								letterSpacing: "0.18em",
								color: "#f5f0e8",
								textTransform: "uppercase",
								margin: "0 0 20px",
							}}
						>
							{heading}
						</p>
						<ul
							style={{
								listStyle: "none",
								margin: 0,
								padding: 0,
								display: "flex",
								flexDirection: "column",
								gap: "12px",
							}}
						>
							{links.map((link) => (
								<li key={link}>
									<a
										href="#"
										style={{
											fontSize: "14px",
											fontWeight: 300,
											color: "#a0998e",
											textDecoration: "none",
											transition: "color 0.2s",
										}}
										onMouseEnter={(e) =>
											(e.currentTarget.style.color =
												"#f5f0e8")
										}
										onMouseLeave={(e) =>
											(e.currentTarget.style.color =
												"#a0998e")
										}
									>
										{link}
									</a>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			{/* Bottom bar */}
			<div
				style={{
					padding: "20px 48px",
				}}
				className="flex items-center justify-between max-sm:flex-col"
			>
				<p
					style={{
						fontSize: "12px",
						fontWeight: 300,
						color: "#6b6458",
						margin: 0,
					}}
					className="max-sm:text-center max-sm:pb-2"
				>
					© 2026 MamaMia. All rights reserved. <br /> • Created
					by Banega Brand
				</p>
				<div
					style={{
						display: "flex",
						gap: "8px",
						alignItems: "center",
					}}
				>
					{["UPI", "RAZORPAY", "VISA", "MASTERCARD"].map((p) => (
						<PaymentBadge key={p} label={p} />
					))}
				</div>
			</div>
		</footer>
	);
}
