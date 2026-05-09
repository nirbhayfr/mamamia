import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// rotate is now a plain number (degrees) — GSAP owns the transform, no CSS transform set
const soaps = [
	{
		color: "#2e5540",
		img: "/jasmine.png",
		rotate: -8,
		zIndex: 1,
		top: "20px",
		left: "0px",
		name: "Jasmine",
	},
	{
		color: "#b8702e",
		img: "/saffron.png",
		rotate: -2,
		zIndex: 2,
		top: "0px",
		left: "60px",
		name: "Saffron",
	},
	{
		color: "#8b1a4a",
		img: "/lotus.png",
		rotate: 5,
		zIndex: 3,
		top: "30px",
		left: "120px",
		name: "Lotus",
	},
	{
		color: "#1e1e1e",
		img: "/charcoal.png",
		rotate: 12,
		zIndex: 4,
		top: "10px",
		left: "190px",
		name: "Charcoal",
	},
];

export default function RitualSet() {
	const sectionRef = useRef(null);
	const cardRefs = useRef([]);
	const eyebrowRef = useRef(null);
	const headingRef = useRef(null);
	const bodyRef = useRef(null);
	const priceRef = useRef(null);
	const btnRef = useRef(null);
	const stackWrapRef = useRef(null);

	useEffect(() => {
		const cards = cardRefs.current;

		// ── Step 1: GSAP owns every transform from the very start ──
		// Set resting state before any ScrollTrigger fires so there's
		// never a CSS-vs-GSAP matrix conflict on completion.
		cards.forEach((el, i) => {
			gsap.set(el, {
				rotation: soaps[i].rotate,
				transformOrigin: "center center",
				force3D: true,
			});
		});

		const ctx = gsap.context(() => {
			const trigger = {
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					once: true,
				},
			};

			// ── Stack wrapper: soft rise ──
			gsap.from(stackWrapRef.current, {
				opacity: 0,
				y: 48,
				duration: 1.1,
				ease: "power2.out",
				...trigger,
			});

			// ── Cards: each fans out from a shared center point ──
			// fromTo keeps full control — "from" values are the start,
			// "to" values are exactly what gsap.set() already defined,
			// so there is zero jump on completion.
			cards.forEach((el, i) => {
				gsap.fromTo(
					el,
					{
						opacity: 0,
						scale: 0.6,
						y: 28,
						rotation: 0, // start flat/collapsed
					},
					{
						opacity: 1,
						scale: 1,
						y: 0,
						rotation: soaps[i].rotate, // land on the exact resting value
						duration: 1.0,
						ease: "expo.out",
						delay: 0.08 * i,
						force3D: true,
						...trigger,
					},
				);
			});

			// ── Right panel: smooth stagger ──
			const textEls = [
				eyebrowRef.current,
				headingRef.current,
				bodyRef.current,
				priceRef.current,
				btnRef.current,
			];
			gsap.from(textEls, {
				opacity: 0,
				y: 26,
				duration: 0.9,
				ease: "power2.out",
				stagger: 0.12,
				delay: 0.1,
				...trigger,
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	// ── Hover handlers — GSAP owns rotation throughout ──
	const onEnter = (el, baseRotate) => {
		gsap.to(el, {
			y: -20,
			scale: 1.08,
			rotation: baseRotate * 0.35, // flatten slightly
			boxShadow: "6px 22px 44px rgba(0,0,0,0.28)",
			duration: 0.5,
			ease: "power2.out",
			overwrite: "auto",
			zIndex: 10,
		});
	};

	const onLeave = (el, baseRotate, baseZIndex) => {
		gsap.to(el, {
			y: 0,
			scale: 1,
			rotation: baseRotate, // back to the exact resting value
			boxShadow: "4px 6px 18px rgba(0,0,0,0.18)",
			duration: 0.9,
			ease: "elastic.out(1, 0.55)",
			overwrite: "auto",
			zIndex: baseZIndex,
		});
	};

	return (
		<section
			ref={sectionRef}
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
				{/* ── Left: stacked soap cards ── */}
				<div
					ref={stackWrapRef}
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
							ref={(el) => (cardRefs.current[i] = el)}
							onMouseEnter={(e) =>
								onEnter(e.currentTarget, soap.rotate)
							}
							onMouseLeave={(e) =>
								onLeave(
									e.currentTarget,
									soap.rotate,
									soap.zIndex,
								)
							}
							style={{
								position: "absolute",
								borderRadius: "10px",
								backgroundColor: soap.color,
								// !! NO transform here — GSAP sets it via gsap.set()
								zIndex: soap.zIndex,
								top: soap.top,
								left: soap.left,
								overflow: "hidden",
								boxShadow:
									"4px 6px 18px rgba(0,0,0,0.18)",
								padding: "10px",
								cursor: "pointer",
								willChange: "transform, box-shadow",
							}}
							className="size-26 md:size-30"
						>
							<img
								src={soap.img}
								alt={soap.name}
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
									opacity: 0.85,
								}}
								onError={(e) => {
									e.target.style.display = "none";
								}}
							/>
						</div>
					))}
				</div>

				{/* ── Right: content ── */}
				<div className="flex flex-col items-center text-center md:items-start md:text-left">
					<p
						ref={eyebrowRef}
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
						ref={headingRef}
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
						ref={bodyRef}
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

					<div
						ref={priceRef}
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

					<button
						ref={btnRef}
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
						Add Bundle to Cart
					</button>
				</div>
			</div>
		</section>
	);
}
