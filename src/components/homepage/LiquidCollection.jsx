import { useEffect, useRef, useState } from "react";

/* ── tokens ── */
const cream = "#f5f0e8";
const dark = "#1a1a18";
const gold = "#810100";
const muted = "#6b6458";
const dividerClr = "#d4cfc5";
const fontDisplay = "'Cormorant Garamond', Garamond, Georgia, serif";
const fontBody = "'Jost', 'Gill Sans', sans-serif";

const BUBBLE_CONFIGS = [
	{ size: 90, left: "62%", top: "12%", delay: 0 },
	{ size: 55, left: "74%", top: "28%", delay: 0.3 },
	{ size: 38, left: "80%", top: "8%", delay: 0.6 },
	{ size: 68, left: "55%", top: "5%", delay: 0.15 },
	{ size: 28, left: "70%", top: "42%", delay: 0.45 },
];

/* ── Bubble ── */
function Bubble({ size, left, top, delay, gsapReady }) {
	const ref = useRef(null);
	useEffect(() => {
		if (!gsapReady || !ref.current || !window.gsap) return;
		const gsap = window.gsap;
		const dur = 3.5 + Math.random() * 2.5;
		const yAmt = -(60 + Math.random() * 80);
		gsap.fromTo(
			ref.current,
			{ opacity: 0, scale: 0.3, y: 30 },
			{
				opacity: 0.8,
				scale: 1,
				y: 0,
				duration: 0.8,
				delay: delay + 0.6,
				ease: "back.out(1.4)",
				onComplete() {
					gsap.to(ref.current, {
						y: yAmt,
						opacity: 0,
						duration: dur,
						ease: "power1.inOut",
						repeat: -1,
						repeatDelay: 1 + Math.random() * 2,
						delay: Math.random() * 1.5,
					});
				},
			},
		);
	}, [gsapReady, delay]);

	return (
		<div
			ref={ref}
			className="absolute rounded-full pointer-events-none"
			style={{
				width: size,
				height: size,
				left,
				top,
				border: "1px solid rgba(255,255,255,0.55)",
				background:
					"radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)",
				willChange: "transform, opacity",
			}}
		/>
	);
}

/* ── Coming Soon overlay — text on top of image ── */
function ComingSoonOverlay({ gsapReady }) {
	const wrapRef = useRef(null);
	const lineRef = useRef(null);
	const textRef = useRef(null);
	const taglineRef = useRef(null);

	useEffect(() => {
		if (!gsapReady || !window.gsap) return;
		const gsap = window.gsap;

		gsap.set([lineRef.current, textRef.current, taglineRef.current], {
			opacity: 0,
		});
		gsap.set(lineRef.current, {
			scaleX: 0,
			transformOrigin: "left center",
		});
		gsap.set(textRef.current, {
			y: 40,
			opacity: 0,
		});
		gsap.set(taglineRef.current, { y: 10 });

		const tl = gsap.timeline({ delay: 0.7 });

		tl.to(lineRef.current, {
			scaleX: 1,
			opacity: 1,
			duration: 0.7,
			ease: "power3.out",
		})
			.to(
				textRef.current,
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power3.out",
				},
				"-=0.3",
			)
			.to(
				taglineRef.current,
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: "power2.out",
				},
				"-=0.4",
			);
	}, [gsapReady]);

	return (
		<div
			ref={wrapRef}
			className="absolute inset-0 z-10 pointer-events-none"
		>
			{/* Vertical COMING SOON */}
			<div
				ref={textRef}
				style={{
					position: "absolute",
					left: "70px",
					bottom: "40px",
					transform: "rotate(-90deg)",
					transformOrigin: "left bottom",
					fontFamily: fontDisplay,
					fontSize: "clamp(35px, 5.5vw, 75px)",
					fontWeight: 300,
					letterSpacing: "0.12em",
					lineHeight: 1,
					whiteSpace: "nowrap",
					color: "rgba(245,240,232,0.92)",
					// color: "rgba(255,255,255,0.96)",
					textTransform: "uppercase",
					textShadow: "0 6px 24px rgba(0,0,0,0.45)",
				}}
			>
				Coming Soon
			</div>

			{/* Bottom left tagline */}
			<div
				style={{
					position: "absolute",
					left: "70px",
					bottom: "36px",
					maxWidth: "280px",
				}}
			>
				<div
					ref={lineRef}
					style={{
						width: 42,
						height: 1,
						backgroundColor: "rgba(245,240,232,0.55)",
						marginBottom: 14,
					}}
				/>

				<p
					ref={taglineRef}
					style={{
						fontFamily: fontDisplay,
						fontStyle: "italic",
						fontSize: "clamp(18px, 2vw, 26px)",
						fontWeight: 300,
						color: "rgba(245,240,232,0.82)",
						margin: 0,
						lineHeight: 1.2,
					}}
				>
					Nourishing liquid soaps for daily rituals.
				</p>
			</div>
		</div>
	);
}

/* ── Tag pill ── */
function TagPill({ label }) {
	const [hovered, setHovered] = useState(false);
	return (
		<span
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				fontFamily: fontBody,
				color: hovered ? dark : muted,
				fontSize: 9,
				letterSpacing: "0.18em",
				border: `1px solid ${hovered ? dark : dividerClr}`,
				transition: "border-color 0.2s, color 0.2s",
				fontWeight: 500,
			}}
			className="uppercase px-3 py-1.5 bg-transparent cursor-default"
		>
			{label}
		</span>
	);
}

/* ── Main component ── */
export default function LiquidCollection() {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [gsapReady, setGsapReady] = useState(false);
	const [btnHover, setBtnHover] = useState(false);

	const imageRef = useRef(null);
	const eyebrowRef = useRef(null);
	const headlineRef = useRef(null);
	const subRef = useRef(null);
	const descRef = useRef(null);
	const dividerRef = useRef(null);
	const formRef = useRef(null);
	const tagsRef = useRef(null);

	/* load GSAP once */
	useEffect(() => {
		if (window.gsap) {
			setGsapReady(true);
			return;
		}
		const s = document.createElement("script");
		s.src =
			"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
		s.onload = () => setGsapReady(true);
		document.head.appendChild(s);
		return () => {
			try {
				document.head.removeChild(s);
			} catch {}
		};
	}, []);

	/* entrance — right panel stagger */
	useEffect(() => {
		if (!gsapReady || !window.gsap) return;
		const gsap = window.gsap;
		const els = [
			eyebrowRef.current,
			headlineRef.current,
			subRef.current,
			descRef.current,
			dividerRef.current,
			formRef.current,
			tagsRef.current,
		].filter(Boolean);

		gsap.set(els, { opacity: 0, y: 28 });
		gsap.set(imageRef.current, { opacity: 0, scale: 1.04, x: -16 });

		gsap.to(imageRef.current, {
			opacity: 1,
			scale: 1,
			x: 0,
			duration: 1.2,
			ease: "power3.out",
			delay: 0.1,
		});
		gsap.to(els, {
			opacity: 1,
			y: 0,
			duration: 0.75,
			stagger: 0.1,
			ease: "power3.out",
			delay: 0.3,
		});
	}, [gsapReady]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email.trim()) setSubmitted(true);
	};

	return (
		<>
			<style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Jost:ital,wght@0,100..900;1,100..900&display=swap');`}</style>

			<section
				style={{
					backgroundColor: cream,
					fontFamily: fontBody,
					color: dark,
				}}
				className="grid grid-cols-1 md:grid-cols-2 min-h-screen overflow-hidden"
				aria-label="Liquid Collection announcement"
			>
				{/* ── LEFT: image pane ── */}
				<div
					ref={imageRef}
					className="relative overflow-hidden min-h-[420px] md:min-h-full"
				>
					{/* full-bleed bg / image */}
					<div
						className="absolute inset-0"
						style={{
							background:
								"linear-gradient(135deg,#e8e0d0 0%,#d5c9b5 40%,#c8b99a 100%)",
							backgroundImage: "url(/liquid.png)",
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					/>

					{/* bottom scrim — lifts text off image */}
					<div
						className="absolute inset-0 pointer-events-none"
						style={{
							background:
								"linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.28) 35%, rgba(0,0,0,0.08) 65%, transparent 100%), linear-gradient(to top, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.12) 45%, transparent 100%)",
						}}
					/>

					{/* floating bubbles */}
					{BUBBLE_CONFIGS.map((b, i) => (
						<Bubble key={i} {...b} gsapReady={gsapReady} />
					))}

					{/* COMING SOON text */}
					<ComingSoonOverlay gsapReady={gsapReady} />

					{/* right-edge cream bleed — desktop only */}
					<div
						className="absolute inset-0 pointer-events-none hidden md:block"
						style={{
							background: `linear-gradient(to right, transparent 58%, ${cream} 100%)`,
						}}
					/>
					{/* bottom-edge cream bleed — mobile only */}
					<div
						className="absolute inset-0 pointer-events-none md:hidden"
						style={{
							background: `linear-gradient(to bottom, transparent 80%, ${cream} 100%)`,
						}}
					/>
				</div>

				{/* ── RIGHT: content pane ── */}
				<div
					style={{ backgroundColor: cream }}
					className="flex flex-col justify-center px-7 py-12 md:px-12 md:py-16 lg:pl-12 lg:pr-16"
				>
					{/* eyebrow */}
					<p
						ref={eyebrowRef}
						style={{
							fontFamily: fontBody,
							color: muted,
							fontSize: 10,
							letterSpacing: "0.22em",
						}}
						className="uppercase font-medium flex items-center gap-2.5 mb-4"
					>
						<span
							style={{
								display: "block",
								width: 28,
								height: 1,
								background: muted,
								opacity: 0.5,
								flexShrink: 0,
							}}
						/>
						New Arrival
					</p>

					{/* headline */}
					<h2
						ref={headlineRef}
						style={{
							fontFamily: fontDisplay,
							fontSize: "clamp(40px, 5vw, 62px)",
							color: dark,
							letterSpacing: "-0.01em",
							lineHeight: 1.05,
							fontWeight: 300,
							margin: 0,
						}}
						className="mb-3"
					>
						The Liquid
						<br />
						Collection
					</h2>

					{/* subheadline */}
					<p
						ref={subRef}
						style={{
							fontFamily: fontDisplay,
							color: gold,
							fontSize: "clamp(18px,2.2vw,24px)",
							fontStyle: "italic",
							fontWeight: 400,
						}}
						className="mb-5"
					>
						Launching Soon
					</p>

					{/* body */}
					<p
						ref={descRef}
						style={{
							fontFamily: fontBody,
							color: muted,
							fontSize: 14,
							lineHeight: 1.75,
							fontWeight: 300,
						}}
						className="max-w-sm mb-9"
					>
						Elevated rituals for every sink. Crafted with the
						same dedication to purity as our signature bars,
						our upcoming liquid soaps blend rare botanicals
						with mineral-rich waters.
					</p>

					{/* divider */}
					<div
						ref={dividerRef}
						style={{
							width: 40,
							height: 1,
							backgroundColor: dividerClr,
						}}
						className="mb-7 flex-shrink-0"
					/>

					{/* form */}
					{/* <div ref={formRef}>
						{!submitted ? (
							<form onSubmit={handleSubmit} noValidate>
								<label
									htmlFor="lc-email"
									style={{
										fontFamily: fontBody,
										color: muted,
										fontSize: 9,
										letterSpacing: "0.2em",
									}}
									className="block uppercase font-medium mb-2.5"
								>
									Get early access notification
								</label>
								<div
									style={{
										borderBottom: `1px solid ${dark}`,
									}}
									className="flex items-stretch max-w-sm mb-6 max-sm:flex-col"
								>
									<input
										id="lc-email"
										type="email"
										required
										placeholder="ritual@mamamia.com"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										style={{
											fontFamily: fontBody,
											color: dark,
											fontSize: 13,
											letterSpacing: "0.03em",
											background:
												"transparent",
											border: "none",
											outline: "none",
											fontWeight: 300,
										}}
										className="flex-1 py-2.5 placeholder:text-[#6b6458]/60"
									/>
									<button
										type="submit"
										onMouseEnter={() =>
											setBtnHover(true)
										}
										onMouseLeave={() =>
											setBtnHover(false)
										}
										style={{
											fontFamily: fontBody,
											backgroundColor: btnHover
												? gold
												: dark,
											color: cream,
											fontSize: 10,
											letterSpacing: "0.18em",
											transition:
												"background-color 0.25s ease",
											border: "none",
											cursor: "pointer",
											fontWeight: 500,
										}}
										className="uppercase flex items-center gap-2 px-5 py-3 whitespace-nowrap"
									>
										Join the Waitlist
										<span
											style={{
												fontSize: 14,
												display: "inline-block",
												transition:
													"transform 0.25s ease",
												transform: btnHover
													? "translateX(3px)"
													: "translateX(0)",
											}}
										>
											→
										</span>
									</button>
								</div>
							</form>
						) : (
							<p
								style={{
									fontFamily: fontDisplay,
									color: gold,
									fontSize: 15,
									fontStyle: "italic",
									fontWeight: 400,
								}}
								className="py-2.5 mb-6"
							>
								Thank you — we'll be in touch before
								launch.
							</p>
						)}
					</div> */}

					{/* tags */}
					<div ref={tagsRef} className="flex flex-wrap gap-2">
						{[
							"Pure Botanical",
							"Sustainably Sourced",
							"Small Batch",
						].map((tag) => (
							<TagPill key={tag} label={tag} />
						))}
					</div>
				</div>
			</section>
		</>
	);
}
