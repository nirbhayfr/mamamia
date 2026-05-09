import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skinTypes = [
	{ id: "dry", label: "DRY SKIN" },
	{ id: "oily", label: "OILY SKIN" },
	{ id: "combination", label: "COMBINATION" },
	// { id: "sensitive", label: "SENSITIVE" },
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
	// sensitive: [
	// 	{
	// 		name: "Lavender & Coconut Milk",
	// 		match: 98,
	// 		desc: "Ultra Calming",
	// 		color: "#4a4a8a",
	// 		img: "/lavender.png",
	// 	},
	// 	{
	// 		name: "Natural Brightening",
	// 		match: 93,
	// 		desc: "Glycerin · Gentle",
	// 		color: "#c07830",
	// 		img: "/bright.png",
	// 	},
	// 	{
	// 		name: "Jasmine Ghee Soap",
	// 		match: 90,
	// 		desc: "Nourishes & Soothes",
	// 		color: "#2e5540",
	// 		img: "/jasmine.png",
	// 	},
	// ],
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

	/* refs */
	const sectionRef = useRef(null);
	const eyebrowRef = useRef(null);
	const headingRef = useRef(null);
	const bodyRef = useRef(null);
	const pillsRef = useRef(null);
	const ctaRef = useRef(null);
	const panelRef = useRef(null);
	const panelHdrRef = useRef(null);
	const cardRefs = useRef([]);

	/* ── Entry animation ── */
	useEffect(() => {
		const ctx = gsap.context(() => {
			const st = {
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 78%",
					once: true,
				},
			};

			/* Left column — stagger up */
			gsap.from(
				[
					eyebrowRef.current,
					headingRef.current,
					bodyRef.current,
					pillsRef.current,
					// ctaRef.current,
				],
				{
					opacity: 0,
					y: 28,
					duration: 0.85,
					ease: "power2.out",
					stagger: 0.11,
					...st,
				},
			);

			/* Right panel slides in from right */
			gsap.from(panelRef.current, {
				opacity: 0,
				x: 36,
				duration: 1.0,
				ease: "power2.out",
				delay: 0.18,
				...st,
			});

			/* Panel header */
			gsap.from(panelHdrRef.current, {
				opacity: 0,
				y: 10,
				duration: 0.6,
				ease: "power2.out",
				delay: 0.35,
				...st,
			});

			/* Rec cards fan in */
			gsap.from(cardRefs.current.filter(Boolean), {
				opacity: 0,
				y: 20,
				duration: 0.65,
				ease: "expo.out",
				stagger: 0.1,
				delay: 0.42,
				...st,
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	/* ── Skin type switch: animate cards out then in ── */
	const prevSelected = useRef(selected);
	useEffect(() => {
		if (prevSelected.current === selected) return;
		prevSelected.current = selected;

		const cards = cardRefs.current.filter(Boolean);

		/* out — quick fade + slight up */
		gsap.to(cards, {
			opacity: 0,
			y: -14,
			duration: 0.22,
			ease: "power2.in",
			stagger: 0.05,
			onComplete() {
				/* reset position below so they come UP on enter */
				gsap.set(cards, { y: 18 });
				/* in — smooth rise */
				gsap.to(cards, {
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: "expo.out",
					stagger: 0.08,
				});
			},
		});

		/* panel header flicker */
		gsap.fromTo(
			panelHdrRef.current,
			{ opacity: 0, x: -8 },
			{
				opacity: 1,
				x: 0,
				duration: 0.4,
				ease: "power2.out",
				delay: 0.1,
			},
		);
	}, [selected]);

	/* ── Card hover ── */
	const onCardEnter = (el) => {
		gsap.to(el, {
			x: 6,
			scale: 1.018,
			backgroundColor: "rgba(255,255,255,0.09)",
			duration: 0.38,
			ease: "power2.out",
			overwrite: "auto",
		});
	};
	const onCardLeave = (el) => {
		gsap.to(el, {
			x: 0,
			scale: 1,
			backgroundColor: "rgba(255,255,255,0.05)",
			duration: 0.55,
			ease: "elastic.out(1, 0.6)",
			overwrite: "auto",
		});
	};

	/* ── Pill hover ── */
	const onPillEnter = (el, isActive) => {
		if (isActive) return;
		gsap.to(el, {
			scale: 1.06,
			duration: 0.28,
			ease: "power2.out",
			overwrite: "auto",
		});
	};
	const onPillLeave = (el, isActive) => {
		if (isActive) return;
		gsap.to(el, {
			scale: 1,
			duration: 0.45,
			ease: "elastic.out(1, 0.55)",
			overwrite: "auto",
		});
	};

	const recs = recommendations[selected];
	const skinLabel = skinTypes.find((s) => s.id === selected)?.label;

	return (
		<section
			ref={sectionRef}
			style={{
				backgroundColor: "var(--color-bg-dark)",
				fontFamily: "var(--font-body)",
			}}
			className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch md:items-center px-5 py-10 md:px-12 md:py-16"
		>
			{/* ── Left ── */}
			<div className="flex-1 max-w-full md:max-w-[480px]">
				<p
					ref={eyebrowRef}
					style={{
						color: "var(--color-gold)",
						letterSpacing: "0.22em",
						fontWeight: 500,
					}}
					className="text-[10px] md:text-[11px] mb-3 md:mb-4"
				>
					SKIN FINDER
				</p>

				<h2
					ref={headingRef}
					style={{
						fontFamily: "var(--font-display)",
						color: "#f5f0e8",
						fontWeight: 300,
						lineHeight: 1.1,
					}}
					className="text-[30px] md:text-[46px] mb-3 md:mb-4"
				>
					Find your perfect soap
				</h2>

				<p
					ref={bodyRef}
					style={{
						color: "rgba(245,240,232,0.55)",
						lineHeight: 1.75,
						fontWeight: 300,
						maxWidth: "360px",
					}}
					className="text-[13px] md:text-[14px] mb-5 md:mb-7"
				>
					Answer a few quick questions and we'll match you with
					the ideal bar for your skin.
				</p>

				{/* Pills */}
				<div
					ref={pillsRef}
					className="flex flex-wrap gap-2 mb-5 md:mb-8"
				>
					{skinTypes.map((type) => {
						const active = selected === type.id;
						return (
							<button
								key={type.id}
								onClick={() => setSelected(type.id)}
								onMouseEnter={(e) =>
									onPillEnter(
										e.currentTarget,
										active,
									)
								}
								onMouseLeave={(e) =>
									onPillLeave(
										e.currentTarget,
										active,
									)
								}
								style={{
									fontSize: "9px",
									fontWeight: 600,
									letterSpacing: "0.14em",
									cursor: "pointer",
									fontFamily: "var(--font-body)",
									transition:
										"background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
									backgroundColor: active
										? "var(--color-gold)"
										: "transparent",
									color: active
										? "#F5F0E8"
										: "rgba(245,240,232,0.75)",
									border: active
										? "1.5px solid var(--color-gold)"
										: "1.5px solid rgba(245,240,232,0.25)",
									boxShadow: active
										? "0 2px 8px rgba(129,1,0,0.2)"
										: "none",
								}}
								className="px-3 py-2 md:px-5 md:py-3"
							>
								{type.label}
							</button>
						);
					})}
				</div>

				{/* CTA */}
				<button
					ref={ctaRef}
					className="flex items-center gap-2.5 w-full md:w-auto justify-center md:justify-start px-6 py-3 md:px-8 md:py-4"
					style={{
						fontSize: "10px",
						fontWeight: 600,
						letterSpacing: "0.18em",
						backgroundColor: "var(--color-gold)",
						border: "1px solid rgba(255,255,255,0.2)",
						boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
						color: "#ffffff",
						cursor: "pointer",
						fontFamily: "var(--font-body)",
						transition: "opacity 0.25s ease",
					}}
					onMouseEnter={(e) =>
						(e.currentTarget.style.opacity = "0.82")
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.opacity = "1")
					}
				>
					FIND MY MATCH
					<ArrowRight size={13} strokeWidth={2} />
				</button>
			</div>

			{/* ── Right: recommendations panel ── */}
			<div
				ref={panelRef}
				className="flex-1 max-w-full md:max-w-[520px] flex flex-col gap-2 md:gap-3 p-4 md:p-7"
				style={{
					backgroundColor: "rgba(255,255,255,0.05)",
					border: "1px solid rgba(245,240,232,0.1)",
					borderRadius: "2px",
				}}
			>
				<p
					ref={panelHdrRef}
					style={{
						color: "rgba(245,240,232,0.4)",
						letterSpacing: "0.2em",
						fontWeight: 500,
					}}
					className="text-[9px] md:text-[10px] mb-1"
				>
					RECOMMENDED FOR {skinLabel}
				</p>

				{recs.map((rec, i) => (
					<div
						key={rec.name}
						ref={(el) => (cardRefs.current[i] = el)}
						onMouseEnter={(e) => onCardEnter(e.currentTarget)}
						onMouseLeave={(e) => onCardLeave(e.currentTarget)}
						className="flex items-center gap-3 md:gap-4 p-3 md:p-4"
						style={{
							backgroundColor: "rgba(255,255,255,0.05)",
							border: "1px solid rgba(245,240,232,0.08)",
							borderRadius: "2px",
							cursor: "pointer",
							willChange: "transform",
						}}
					>
						{/* Swatch */}
						<div
							className="shrink-0 w-10 h-10 md:w-14 md:h-14"
							style={{
								backgroundColor: rec.color,
								borderRadius: "6px",
								overflow: "hidden",
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
									fontWeight: 300,
									lineHeight: 1.2,
									margin: "0 0 3px",
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
								className="text-[15px] md:text-[18px]"
							>
								{rec.name}
							</h4>
							<p
								style={{
									color: "rgba(245,240,232,0.65)",
									letterSpacing: "0.04em",
									margin: 0,
									fontWeight: 400,
								}}
								className="text-[10px] md:text-[11px]"
							>
								{rec.match}% Match · {rec.desc}
							</p>
						</div>

						{/* Arrow hint */}
						<ArrowRight
							size={13}
							strokeWidth={1.5}
							style={{
								color: "rgba(245,240,232,0.25)",
								flexShrink: 0,
							}}
						/>
					</div>
				))}
			</div>
		</section>
	);
}
