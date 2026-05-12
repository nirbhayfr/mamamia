import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
	{ label: "HIMALAYAN PINK SALT", sub: "Mineral-rich detox" },
	{ label: "EUCALYPTUS OIL", sub: "Opens & revives" },
	{ label: "DEAD SEA MINERALS", sub: "Deep cell renewal" },
];

export default function BathSalt() {
	const sectionRef = useRef(null);
	const imgRef = useRef(null);
	const lineRefs = useRef([]);
	const tagRef = useRef(null);
	const bodyRef = useRef(null);
	const btnRef = useRef(null);
	const pillarsRef = useRef([]);
	const accentRef = useRef(null);
	const numberRef = useRef(null);
	const rulerRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const st = {
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 72%",
					once: true,
				},
			};

			// Ruler draws in
			gsap.from(rulerRef.current, {
				scaleX: 0,
				transformOrigin: "left center",
				duration: 1.1,
				ease: "expo.inOut",
				...st,
			});

			// Ghost number counts up
			const obj = { val: 0 };
			gsap.to(obj, {
				val: 100,
				duration: 1.6,
				ease: "power3.out",
				delay: 0.3,
				scrollTrigger: st.scrollTrigger,
				onUpdate() {
					if (numberRef.current)
						numberRef.current.textContent = Math.round(
							obj.val,
						);
				},
			});

			// Image wipes up from bottom using clipPath
			gsap.fromTo(
				imgRef.current,
				{ clipPath: "inset(100% 0% 0% 0%)" },
				{
					clipPath: "inset(0% 0% 0% 0%)",
					duration: 1.2,
					ease: "expo.out",
					delay: 0.15,
					...st,
				},
			);

			// Accent line grows down
			gsap.from(accentRef.current, {
				scaleY: 0,
				transformOrigin: "top center",
				duration: 1.0,
				ease: "expo.out",
				delay: 0.4,
				...st,
			});

			// Heading lines
			gsap.from(lineRefs.current.filter(Boolean), {
				opacity: 0,
				y: 40,
				duration: 0.75,
				ease: "power3.out",
				stagger: 0.13,
				delay: 0.5,
				...st,
			});

			// Tag, body, buttons
			gsap.from([tagRef.current, bodyRef.current, btnRef.current], {
				opacity: 0,
				y: 20,
				duration: 0.65,
				ease: "power3.out",
				stagger: 0.12,
				delay: 0.85,
				...st,
			});

			// Pillars
			gsap.from(pillarsRef.current.filter(Boolean), {
				opacity: 0,
				y: 30,
				duration: 0.6,
				ease: "power3.out",
				stagger: 0.09,
				delay: 1.0,
				...st,
			});

			// Scroll parallax on image only — does NOT affect container size
			gsap.to(imgRef.current, {
				y: -40,
				ease: "none",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top bottom",
					end: "bottom top",
					scrub: 1.5,
				},
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			style={{
				fontFamily: "var(--font-body)",
				backgroundColor: "var(--color-bg-primary)",
				position: "relative",
			}}
		>
			{/* ── Top ruler ── */}
			<div
				style={{
					height: "1px",
					backgroundColor: "var(--color-divider)",
					width: "100%",
				}}
			/>

			{/* ── Main grid ── */}
			<div
				className="grid grid-cols-1 md:grid-cols-2"
				style={{ minHeight: "620px" }}
			>
				{/* ── Left: Image ── */}
				<div
					style={{
						position: "relative",
						backgroundColor: "var(--color-bg-secondary)",
						minHeight: "420px",
						/* overflow hidden ONLY on the image cell, not the section */
						overflow: "hidden",
					}}
				>
					{/* Ghost number — sits behind image via z-index */}
					<div
						ref={numberRef}
						style={{
							position: "absolute",
							bottom: "-12px",
							left: "-8px",
							fontFamily: "var(--font-display)",
							fontSize: "clamp(120px, 22vw, 200px)",
							fontWeight: 700,
							color: "transparent",
							WebkitTextStroke: "1px rgba(26,26,24,0.06)",
							lineHeight: 1,
							userSelect: "none",
							pointerEvents: "none",
							zIndex: 0,
						}}
					>
						0
					</div>

					{/* Product image — fills cell, parallax applied here */}
					<img
						ref={imgRef}
						src="/salt.png"
						alt="Ritual Bath Salt"
						style={{
							display: "block",
							position: "absolute",
							inset: "-40px 0 -40px 0" /* extra vertical room for parallax travel */,
							width: "100%",
							height: "calc(100% + 80px)",
							objectFit: "cover",
							objectPosition: "center",
							zIndex: 1,
						}}
					/>

					{/* Floating label */}
					<div
						style={{
							position: "absolute",
							bottom: "24px",
							left: "24px",
							zIndex: 2,
							display: "flex",
							alignItems: "center",
							gap: "10px",
						}}
					>
						<div
							style={{
								width: "6px",
								height: "6px",
								borderRadius: "50%",
								backgroundColor: "var(--color-gold)",
							}}
						/>
						<span
							style={{
								fontSize: "9px",
								fontWeight: 600,
								letterSpacing: "0.22em",
								color: "var(--color-text-dark)",
								textTransform: "uppercase",
								backgroundColor:
									"var(--color-bg-primary)",
								padding: "5px 10px",
							}}
						>
							RITUAL BATH SALT
						</span>
					</div>
				</div>

				{/* ── Right: Content ── */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						padding: "clamp(40px, 6vw, 80px) clamp(32px, 5vw, 64px)",
						borderLeft: "1px solid var(--color-divider)",
						position: "relative",
					}}
				>
					{/* Vertical accent line */}
					<div
						ref={accentRef}
						style={{
							position: "absolute",
							left: 0,
							top: "10%",
							bottom: "10%",
							width: "2px",
							backgroundColor: "var(--color-gold)",
							opacity: 0.6,
						}}
					/>

					{/* Eyebrow */}
					<div
						ref={tagRef}
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: "10px",
							marginBottom: "28px",
						}}
					>
						<span
							style={{
								display: "inline-block",
								width: "28px",
								height: "1px",
								backgroundColor: "var(--color-gold)",
							}}
						/>
						<span
							style={{
								fontSize: "10px",
								fontWeight: 600,
								letterSpacing: "0.28em",
								color: "var(--color-gold)",
								textTransform: "uppercase",
							}}
						>
							NEW · BATH COLLECTION
						</span>
					</div>

					{/* Heading */}
					<h2
						style={{
							fontFamily: "var(--font-display)",
							fontWeight: 300,
							lineHeight: 1.0,
							color: "var(--color-text-dark)",
							marginBottom: "32px",
							fontSize: "clamp(42px, 5.5vw, 68px)",
						}}
					>
						{[
							"Soak in",
							"ancient",
							<em
								key="e"
								style={{
									fontStyle: "italic",
									color: "#423427",
								}}
							>
								ritual.
							</em>,
						].map((line, i) => (
							<div
								key={i}
								ref={(el) => (lineRefs.current[i] = el)}
								style={{ display: "block" }}
							>
								{line}
							</div>
						))}
					</h2>

					{/* Body */}
					<p
						ref={bodyRef}
						style={{
							fontSize: "13.5px",
							lineHeight: 1.8,
							color: "var(--color-text-muted)",
							fontWeight: 300,
							maxWidth: "360px",
							marginBottom: "40px",
						}}
					>
						Drawn from ancient wellness traditions —
						mineral-dense Himalayan salts, cold-pressed
						eucalyptus, and Dead Sea extracts work in concert
						to draw out toxins, soften skin, and still the
						mind.
					</p>

					{/* Pillars */}
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(3, 1fr)",
							borderTop: "1px solid var(--color-divider)",
							borderLeft: "1px solid var(--color-divider)",
							marginBottom: "40px",
						}}
					>
						{pillars.map((p, i) => (
							<div
								key={p.label}
								ref={(el) =>
									(pillarsRef.current[i] = el)
								}
								style={{
									padding: "20px 16px",
									borderRight:
										"1px solid var(--color-divider)",
									borderBottom:
										"1px solid var(--color-divider)",
								}}
							>
								<p
									style={{
										fontSize: "8.5px",
										fontWeight: 600,
										letterSpacing: "0.18em",
										color: "var(--color-text-dark)",
										textTransform: "uppercase",
										marginBottom: "6px",
										lineHeight: 1.4,
									}}
								>
									{p.label}
								</p>
								<p
									style={{
										fontSize: "10.5px",
										color: "var(--color-text-muted)",
										fontWeight: 300,
										letterSpacing: "0.04em",
									}}
								>
									{p.sub}
								</p>
							</div>
						))}
					</div>

					{/* CTAs */}
					<div
						ref={btnRef}
						style={{
							display: "flex",
							gap: "12px",
							flexWrap: "wrap",
						}}
					>
						<button
							style={{
								backgroundColor: "var(--color-bg-dark)",
								color: "var(--color-text-light)",
								border: "none",
								padding: "16px 36px",
								fontSize: "10px",
								fontWeight: 600,
								letterSpacing: "0.2em",
								textTransform: "uppercase",
								cursor: "pointer",
								fontFamily: "var(--font-body)",
								transition: "opacity 0.2s",
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.opacity = "0.8")
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.opacity = "1")
							}
						>
							+ ADD TO CART
						</button>
						<button
							style={{
								backgroundColor: "transparent",
								color: "var(--color-text-dark)",
								border: "1.5px solid var(--color-divider)",
								padding: "16px 28px",
								fontSize: "10px",
								fontWeight: 600,
								letterSpacing: "0.2em",
								textTransform: "uppercase",
								cursor: "pointer",
								fontFamily: "var(--font-body)",
								transition:
									"border-color 0.2s, opacity 0.2s",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.borderColor =
									"var(--color-text-dark)";
								e.currentTarget.style.opacity = "0.7";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.borderColor =
									"var(--color-divider)";
								e.currentTarget.style.opacity = "1";
							}}
						>
							LEARN MORE
						</button>
					</div>
				</div>
			</div>

			{/* ── Bottom ruler ── */}
			<div
				ref={rulerRef}
				style={{
					height: "1px",
					backgroundColor: "var(--color-divider)",
					width: "100%",
				}}
			/>
		</section>
	);
}
