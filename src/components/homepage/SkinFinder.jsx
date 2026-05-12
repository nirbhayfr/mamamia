import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skinTypes = [
	{ id: "dry", label: "DRY SKIN" },
	{ id: "oily", label: "OILY SKIN" },
	{ id: "combination", label: "COMBINATION" },
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

const panelShell = {
	backgroundColor: "rgba(255,255,255,0.05)",
	border: "1px solid rgba(245,240,232,0.1)",
	borderRadius: "2px",
	overflow: "hidden",
};

export default function SkinFinder() {
	const [selected, setSelected] = useState("dry");
	const [revealed, setRevealed] = useState(false);

	const sectionRef = useRef(null);
	const eyebrowRef = useRef(null);
	const headingRef = useRef(null);
	const bodyRef = useRef(null);
	const pillsRef = useRef(null);
	const ctaRef = useRef(null);
	const panelRef = useRef(null);
	const panelHdrRef = useRef(null);
	const cardRefs = useRef([]);
	const placeholderRef = useRef(null);
	const rightColRef = useRef(null);

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

			gsap.from(
				[
					eyebrowRef.current,
					headingRef.current,
					bodyRef.current,
					pillsRef.current,
					ctaRef.current,
				],
				{
					opacity: 0,
					y: 24,
					duration: 0.7,
					ease: "power3.out",
					stagger: 0.09,
					...st,
				},
			);

			gsap.from(placeholderRef.current, {
				opacity: 0,
				y: 20,
				duration: 0.8,
				ease: "power3.out",
				delay: 0.2,
				...st,
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	/* ── Reveal ── */
	const handleReveal = () => {
		if (revealed) return;
		setRevealed(true);
		prevSelected.current = selected;

		gsap.to(placeholderRef.current, {
			opacity: 0,
			duration: 0.35,
			ease: "power2.inOut",
			onComplete: () => {
				if (placeholderRef.current)
					placeholderRef.current.style.display = "none";
			},
		});

		// ← add this line
		panelRef.current.style.visibility = "visible";

		gsap.to(panelRef.current, {
			opacity: 1,
			y: 0,
			duration: 0.55,
			ease: "power3.out",
			delay: 0.28,
		});

		gsap.from(panelHdrRef.current, {
			opacity: 0,
			y: 8,
			duration: 0.45,
			ease: "power3.out",
			delay: 0.52,
		});

		// Cards stagger in cleanly
		gsap.to(cardRefs.current.filter(Boolean), {
			opacity: 1,
			y: 0,
			duration: 0.5,
			ease: "power3.out",
			stagger: 0.08,
			delay: 0.58,
		});
	};

	/* ── Skin type switch ── */
	const prevSelected = useRef(null);
	useEffect(() => {
		if (!revealed || prevSelected.current === selected) return;
		prevSelected.current = selected;

		const cards = cardRefs.current.filter(Boolean);

		gsap.to(cards, {
			opacity: 0,
			y: -10,
			duration: 0.18,
			ease: "power2.in",
			stagger: 0.04,
			onComplete() {
				gsap.set(cards, { y: 14 });
				gsap.to(cards, {
					opacity: 1,
					y: 0,
					duration: 0.42,
					ease: "power3.out",
					stagger: 0.07,
				});
			},
		});

		gsap.fromTo(
			panelHdrRef.current,
			{ opacity: 0, x: -6 },
			{
				opacity: 1,
				x: 0,
				duration: 0.35,
				ease: "power3.out",
				delay: 0.08,
			},
		);
	}, [selected, revealed]);

	/* ── Hover ── */
	const onCardEnter = (el) =>
		gsap.to(el, {
			scale: 1.012,
			y: -2,
			backgroundColor: "rgba(255,255,255,0.09)",
			duration: 0.32,
			ease: "power2.out",
			overwrite: "auto",
		});
	const onCardLeave = (el) =>
		gsap.to(el, {
			scale: 1,
			y: 0,
			backgroundColor: "rgba(255,255,255,0.05)",
			duration: 0.5,
			ease: "elastic.out(1, 0.65)",
			overwrite: "auto",
		});
	const onPillEnter = (el, isActive) => {
		if (!isActive)
			gsap.to(el, {
				scale: 1.05,
				duration: 0.25,
				ease: "power2.out",
				overwrite: "auto",
			});
	};
	const onPillLeave = (el, isActive) => {
		if (!isActive)
			gsap.to(el, {
				scale: 1,
				duration: 0.4,
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
			<div
				className="w-full md:w-[42%] lg:w-[40%] shrink-0"
				style={{ minWidth: 0 }}
			>
				<p
					ref={eyebrowRef}
					className="text-[10px] md:text-[11px] mb-3 md:mb-4"
					style={{
						color: "var(--color-gold)",
						letterSpacing: "0.22em",
						fontWeight: 500,
					}}
				>
					SKIN FINDER
				</p>

				<h2
					ref={headingRef}
					className="text-[30px] md:text-[46px] mb-3 md:mb-4"
					style={{
						fontFamily: "var(--font-display)",
						color: "#f5f0e8",
						fontWeight: 300,
						lineHeight: 1.1,
					}}
				>
					Find your perfect soap
				</h2>

				<p
					ref={bodyRef}
					className="text-[13px] md:text-[14px] mb-5 md:mb-7"
					style={{
						color: "rgba(245,240,232,0.55)",
						lineHeight: 1.75,
						fontWeight: 300,
						maxWidth: "360px",
					}}
				>
					Select your skin type below and hit{" "}
					<em
						style={{
							fontStyle: "italic",
							color: "rgba(245,240,232,0.75)",
						}}
					>
						Find My Match
					</em>{" "}
					— we'll surface the right bar for you.
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
								className="px-3 py-2 md:px-5 md:py-3"
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
							>
								{type.label}
							</button>
						);
					})}
				</div>

				{/* CTA — no GSAP on this, instant response */}
				<button
					ref={ctaRef}
					onClick={handleReveal}
					className="flex items-center gap-2.5 w-full md:w-auto justify-center md:justify-start px-6 py-3 md:px-8 md:py-4"
					style={{
						fontSize: "10px",
						fontWeight: 600,
						letterSpacing: "0.18em",
						backgroundColor: revealed
							? "rgba(129,1,0,0.45)"
							: "var(--color-gold)",
						border: "1px solid rgba(255,255,255,0.15)",
						color: "#ffffff",
						cursor: revealed ? "default" : "pointer",
						fontFamily: "var(--font-body)",
						transition: "background-color 0.3s ease",
						pointerEvents: revealed ? "none" : "auto",
					}}
				>
					{revealed ? "SHOWING YOUR MATCHES" : "FIND MY MATCH"}
					<ArrowRight size={13} strokeWidth={2} />
				</button>
			</div>

			{/* ── Right ── */}
			<div
				ref={rightColRef}
				className="w-full md:w-[58%] lg:w-[60%] shrink-0 relative"
				style={{ minHeight: "280px" }}
			>
				{/* Placeholder */}
				<div
					ref={placeholderRef}
					className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 md:p-12"
					style={{ ...panelShell }}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "12px",
							width: "100%",
							maxWidth: "340px",
						}}
					>
						{[100, 72, 85].map((w, i) => (
							<div
								key={i}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "14px",
								}}
							>
								<div
									style={{
										width: "40px",
										height: "40px",
										borderRadius: "6px",
										background:
											"rgba(255,255,255,0.06)",
										flexShrink: 0,
									}}
								/>
								<div style={{ flex: 1 }}>
									<div
										style={{
											height: "8px",
											borderRadius: "2px",
											background:
												"rgba(255,255,255,0.08)",
											width: `${w}%`,
											marginBottom: "7px",
										}}
									/>
									<div
										style={{
											height: "6px",
											borderRadius: "2px",
											background:
												"rgba(255,255,255,0.05)",
											width: "48%",
										}}
									/>
								</div>
							</div>
						))}
					</div>
					<p
						style={{
							color: "rgba(245,240,232,0.2)",
							fontSize: "10px",
							letterSpacing: "0.22em",
							fontWeight: 500,
							textTransform: "uppercase",
							marginTop: "6px",
							textAlign: "center",
						}}
					>
						Select your skin type &amp; find your match
					</p>
				</div>

				{/* Recommendations panel */}
				<div
					ref={panelRef}
					className="w-full flex flex-col gap-2 md:gap-3 p-5 md:p-8"
					style={{
						...panelShell,
						opacity: 0,
						transform: "translateY(20px)",
						visibility: "hidden",
					}}
				>
					<p
						ref={panelHdrRef}
						className="text-[9px] md:text-[10px] mb-2"
						style={{
							color: "rgba(245,240,232,0.4)",
							letterSpacing: "0.2em",
							fontWeight: 500,
						}}
					>
						RECOMMENDED FOR {skinLabel}
					</p>

					{recs.map((rec, i) => (
						<div
							key={rec.name}
							ref={(el) => (cardRefs.current[i] = el)}
							onMouseEnter={(e) =>
								onCardEnter(e.currentTarget)
							}
							onMouseLeave={(e) =>
								onCardLeave(e.currentTarget)
							}
							className="flex items-center gap-3 md:gap-5 p-3 md:p-4 pr-5 md:pr-6"
							style={{
								opacity: 0,
								transform: "translateY(16px)",
								backgroundColor:
									"rgba(255,255,255,0.05)",
								border: "1px solid rgba(245,240,232,0.08)",
								borderRadius: "2px",
								cursor: "pointer",
								width: "100%",
								minWidth: 0,
								transformOrigin: "center center",
								willChange: "transform, opacity",
								backfaceVisibility: "hidden",
							}}
						>
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
										e.target.style.display =
											"none";
									}}
								/>
							</div>

							<div style={{ flex: 1, minWidth: 0 }}>
								<h4
									className="text-[15px] md:text-[18px]"
									style={{
										fontFamily:
											"var(--font-display)",
										color: "#f5f0e8",
										fontWeight: 300,
										lineHeight: 1.2,
										margin: "0 0 3px",
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
									}}
								>
									{rec.name}
								</h4>
								<p
									className="text-[10px] md:text-[11px]"
									style={{
										color: "rgba(245,240,232,0.65)",
										letterSpacing: "0.04em",
										margin: 0,
										fontWeight: 400,
									}}
								>
									{rec.match}% Match · {rec.desc}
								</p>
							</div>

							<ArrowRight
								size={13}
								strokeWidth={1.5}
								style={{
									color: "rgba(245,240,232,0.25)",
									flexShrink: 0,
									marginLeft: "8px",
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
