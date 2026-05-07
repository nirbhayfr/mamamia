export default function OurCraft() {
	return (
		<section
			style={{
				fontFamily: "var(--font-body)",
				// display: "grid",
				// gridTemplateColumns: "1fr 1fr",
				minHeight: "520px",
			}}
			className="grid md:grid-cols-2"
		>
			{/* Left Panel */}
			<div
				style={{
					backgroundColor: "var(--color-bg-primary)",
					borderRight: "1px solid var(--color-divider)",
					padding: "56px 48px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<p
					style={{
						fontFamily: "var(--font-display)",
						fontSize: "80px",
						fontWeight: 300,
						color: "var(--color-text-dark)",
						lineHeight: 1,
						margin: "0 0 4px",
						letterSpacing: "-2px",
					}}
				>
					100%
				</p>
				<p
					style={{
						fontSize: "11px",
						fontWeight: 500,
						letterSpacing: "0.22em",
						color: "var(--color-text-muted)",
						textTransform: "uppercase",
						marginBottom: "36px",
					}}
				>
					Natural Ingredients
				</p>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "12px",
						width: "100%",
						maxWidth: "300px",
					}}
				>
					{[
						{
							label: "Cold Processed",
							sub: "Nutrients preserved in every bar",
							icon: (
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<circle cx="12" cy="12" r="10" />
									<polyline points="8 12 11 15 16 9" />
								</svg>
							),
						},
						{
							label: "No Harsh Chemicals",
							sub: "Sulfate & Paraben free",
							icon: (
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
								</svg>
							),
						},
						{
							label: "Cruelty Free",
							sub: "Kind to skin, kind to animals",
							icon: (
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
								</svg>
							),
						},
					].map((item) => (
						<div
							key={item.label}
							style={{
								display: "flex",
								alignItems: "center",
								gap: "14px",
								background: "#fff",
								border: "1px solid var(--color-divider)",
								borderRadius: "3px",
								padding: "14px 18px",
							}}
						>
							<div
								style={{
									width: "32px",
									height: "32px",
									borderRadius: "50%",
									background:
										"var(--color-bg-secondary)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0,
									color: "var(--color-gold)",
								}}
							>
								{item.icon}
							</div>
							<div>
								<p
									style={{
										fontSize: "13.5px",
										fontWeight: 500,
										color: "var(--color-text-dark)",
										margin: "0 0 2px",
										letterSpacing: "0.01em",
									}}
								>
									{item.label}
								</p>
								<p
									style={{
										fontSize: "12px",
										color: "var(--color-text-muted)",
										margin: 0,
										fontWeight: 300,
									}}
								>
									{item.sub}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Right Panel */}
			<div
				className="
	bg-[var(--color-bg-secondary)]
	px-6 py-10
	md:px-[52px] md:py-[56px]
	flex flex-col justify-center
	md:text-left
	items-center md:items-start
"
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
					Our Craft
				</p>

				<h2
					style={{
						fontFamily: "var(--font-display)",
						fontSize: "44px",
						fontWeight: 300,
						color: "var(--color-text-dark)",
						lineHeight: 1.1,
						margin: "0 0 20px",
						letterSpacing: "-0.5px",
					}}
				>
					Made with
					<br />
					intention,
					<br />
					not shortcuts
				</h2>

				<p
					style={{
						fontSize: "14px",
						lineHeight: 1.75,
						color: "var(--color-text-muted)",
						margin: "0 0 32px",
						fontWeight: 300,
						maxWidth: "340px",
					}}
				>
					Every MamaMia bar is cold-processed by hand — a method
					that keeps the natural glycerin and nutrients alive in
					the soap, giving your skin what it truly deserves.
				</p>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "18px",
						marginBottom: "36px",
					}}
				>
					{[
						{
							n: "01",
							title: "Source",
							sub: "Premium ingredients, ethically sourced",
						},
						{
							n: "02",
							title: "Cold Process",
							sub: "No heat — nutrients stay intact",
						},
						{
							n: "03",
							title: "Cure",
							sub: "4–6 weeks for a perfect bar",
						},
						{
							n: "04",
							title: "Handcraft",
							sub: "Finished and packed by hand",
						},
					].map((step) => (
						<div
							key={step.n}
							style={{
								display: "flex",
								alignItems: "flex-start",
								gap: "18px",
							}}
						>
							<span
								style={{
									fontSize: "12px",
									fontWeight: 500,
									color: "var(--color-gold)",
									letterSpacing: "0.05em",
									minWidth: "20px",
									paddingTop: "2px",
								}}
							>
								{step.n}
							</span>
							<div>
								<p
									style={{
										fontSize: "14px",
										fontWeight: 500,
										color: "var(--color-text-dark)",
										margin: "0 0 2px",
									}}
								>
									{step.title}
								</p>
								<p
									style={{
										fontSize: "12.5px",
										color: "var(--color-text-muted)",
										margin: 0,
										fontWeight: 300,
									}}
								>
									{step.sub}
								</p>
							</div>
						</div>
					))}
				</div>

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
						(e.currentTarget.style.opacity = "0.82")
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.opacity = "1")
					}
				>
					Read Our Story
				</button>
			</div>
		</section>
	);
}
