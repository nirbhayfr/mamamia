const reviews = [
	{
		initials: "PR",
		name: "Priya R.",
		location: "Mumbai",
		text: '"The Sandalwood Saffron bar completely transformed my skin — the tan visibly reduced in two weeks."',
		bg: "#b8915a",
	},
	{
		initials: "AN",
		name: "Ananya N.",
		location: "Delhi",
		text: '"I was skeptical about ghee soap but the Jasmine bar leaves my skin so soft without any greasy feeling."',
		bg: "#b8915a",
	},
	{
		initials: "SK",
		name: "Siddharth K.",
		location: "Bangalore",
		text: '"Charcoal Tea Tree is the only soap that cleared my pores without stripping my skin. Repurchasing always."',
		bg: "#b8915a",
	},
];

function Stars({ count = 5 }) {
	return (
		<div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
			{Array.from({ length: count }).map((_, i) => (
				<span
					key={i}
					style={{
						color: "var(--color-gold)",
						fontSize: "16px",
					}}
				>
					★
				</span>
			))}
		</div>
	);
}

export default function Reviews() {
	return (
		<section
			style={{
				backgroundColor: "var(--color-bg-primary)",
				fontFamily: "var(--font-body)",
				padding: "56px 48px",
			}}
		>
			{/* Header */}
			<div style={{ textAlign: "center", marginBottom: "40px" }}>
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
					What People Say
				</p>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						gap: "6px",
						marginBottom: "8px",
					}}
				>
					{[1, 2, 3, 4, 5].map((i) => (
						<span
							key={i}
							style={{
								color: "var(--color-gold)",
								fontSize: "20px",
							}}
						>
							★
						</span>
					))}
				</div>
				<p
					style={{
						fontSize: "14px",
						color: "var(--color-text-muted)",
						// color: "#B8915A",
						fontWeight: 300,
					}}
				>
					4.9 / 5 from 1,200+ reviews
				</p>
			</div>

			{/* Cards */}
			<div
				style={{
					gap: "20px",
				}}
				className="grid md:grid-cols-3 grid-cols-1"
			>
				{reviews.map((r) => (
					<div
						key={r.name}
						style={{
							background: "#fff",
							border: "1px solid var(--color-divider)",
							borderRadius: "3px",
							padding: "28px 28px 24px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
					>
						<div>
							<Stars />
							<p
								style={{
									fontFamily: "var(--font-display)",
									fontSize: "16px",
									fontWeight: 300,
									fontStyle: "italic",
									color: "var(--color-text-dark)",
									lineHeight: 1.65,
									marginBottom: "24px",
								}}
							>
								{r.text}
							</p>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "12px",
							}}
						>
							<div
								style={{
									width: "40px",
									height: "40px",
									borderRadius: "50%",
									background: "#e8dcc8",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "12px",
									fontWeight: 600,
									color: "var(--color-gold)",
									letterSpacing: "0.04em",
									flexShrink: 0,
								}}
							>
								{r.initials}
							</div>
							<div>
								<p
									style={{
										fontSize: "14px",
										fontWeight: 500,
										color: "var(--color-text-dark)",
										margin: 0,
									}}
								>
									{r.name}
								</p>
								<p
									style={{
										fontSize: "12px",
										color: "var(--color-text-muted)",
										margin: 0,
										fontWeight: 300,
									}}
								>
									{r.location}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
