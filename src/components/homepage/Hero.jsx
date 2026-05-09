import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const soaps = [
	{
		name: "JASMINE GHEE",
		category: "PREMIUM GHEE SOAP",
		washColor: "46,85,64",
		img: "/jasmine.png",
		bestseller: false,
	},
	{
		name: "SANDALWOOD & SAFFRON",
		category: "PREMIUM GHEE SOAP",
		washColor: "184,112,46",
		img: "/saffron.png",
		bestseller: true,
	},
	{
		name: "RED SANDALWOOD & LOTUS",
		category: "LUXURY SOAP",
		washColor: "139,26,74",
		img: "/lotus.png",
		bestseller: false,
	},
	{
		name: "CHARCOAL TEA TREE",
		category: "GLYCERIN SOAP",
		washColor: "30,30,30",
		img: "/charcoal.png",
		bestseller: false,
	},
];

const tickerItems = [
	"NO SULFATES",
	"NO PARABENS",
	"COLD PROCESSED",
	"HANDCRAFTED IN INDIA",
	// "GH AWARD WINNER",
];

const IMG_SIZES = { mobile: "180px", tablet: "220px", desktop: "260px" };
const AUTOPLAY_DELAY = 5000;

export default function HeroSection() {
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const [current, setCurrent] = useState(0);

	const animating = useRef(false);
	const currentRef = useRef(0);
	const slideRefs = useRef([]);
	const imgRefs = useRef([]);
	const nameRefs = useRef([]);
	const categoryRefs = useRef([]);
	const washRef = useRef(null);

	// Left panel refs
	const leftPanelRef = useRef(null);
	const leftEyebrowRef = useRef(null);
	const leftHeadingRef = useRef(null);
	const leftBodyRef = useRef(null);
	const leftBtnsRef = useRef(null);

	const imgSize = isMobile
		? IMG_SIZES.mobile
		: isTablet
			? IMG_SIZES.tablet
			: IMG_SIZES.desktop;

	function goTo(next, dir) {
		if (animating.current || next === currentRef.current) return;
		animating.current = true;

		const outSlide = slideRefs.current[currentRef.current];
		const inSlide = slideRefs.current[next];
		const outImg = imgRefs.current[currentRef.current];
		const inImg = imgRefs.current[next];
		const outName = nameRefs.current[currentRef.current];
		const inName = nameRefs.current[next];
		const outCat = categoryRefs.current[currentRef.current];
		const inCat = categoryRefs.current[next];

		gsap.set(inSlide, { opacity: 0, pointerEvents: "none" });
		gsap.set(inImg, {
			y: dir * 44,
			scale: 0.9,
			opacity: 0,
			width: imgSize,
		});
		gsap.set(outImg, { width: imgSize });
		gsap.set(inName, { y: dir * 16, opacity: 0 });
		gsap.set(inCat, { y: dir * 16, opacity: 0 });

		inSlide.style.pointerEvents = "all";

		const tl = gsap.timeline({
			onComplete: () => {
				gsap.set(outSlide, { opacity: 0, pointerEvents: "none" });
				gsap.set(outImg, { clearProps: "y,scale,opacity" });
				gsap.set(outName, { clearProps: "y,opacity" });
				gsap.set(outCat, { clearProps: "y,opacity" });
				currentRef.current = next;
				setCurrent(next);
				animating.current = false;
			},
		});

		tl.to(
			outImg,
			{
				y: -dir * 28,
				scale: 0.94,
				opacity: 0,
				duration: 0.34,
				ease: "power2.in",
			},
			0,
		)
			.to(
				outName,
				{
					y: -dir * 10,
					opacity: 0,
					duration: 0.22,
					ease: "power2.in",
				},
				0,
			)
			.to(
				outCat,
				{
					y: -dir * 10,
					opacity: 0,
					duration: 0.22,
					ease: "power2.in",
				},
				0,
			)
			.to(
				outSlide,
				{ opacity: 0, duration: 0.34, ease: "power2.in" },
				0,
			)
			.add(() => {
				gsap.to(washRef.current, {
					opacity: 0,
					duration: 0.2,
					ease: "power1.in",
					onComplete: () => {
						washRef.current.style.background = `radial-gradient(ellipse 55% 55% at 50% 46%, rgba(${soaps[next].washColor}, 0.13) 0%, transparent 70%)`;
						gsap.to(washRef.current, {
							opacity: 1,
							duration: 0.5,
							ease: "power2.out",
						});
					},
				});
			}, 0.16)
			.to(inSlide, { opacity: 1, duration: 0.14 }, 0.28)
			.to(
				inImg,
				{
					y: 0,
					scale: 1,
					opacity: 1,
					width: imgSize,
					duration: 0.54,
					ease: "power3.out",
				},
				0.28,
			)
			.to(
				inName,
				{ y: 0, opacity: 1, duration: 0.42, ease: "power3.out" },
				0.38,
			)
			.to(
				inCat,
				{ y: 0, opacity: 1, duration: 0.42, ease: "power3.out" },
				0.44,
			);
	}

	// Resize listener
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

	// Keep image sizes in sync on resize
	useEffect(() => {
		imgRefs.current.forEach((img) => {
			if (img) img.style.width = imgSize;
		});
	}, [imgSize]);

	// Autoplay
	useEffect(() => {
		const timer = setInterval(() => {
			const next = (currentRef.current + 1) % soaps.length;
			goTo(next, 1);
		}, AUTOPLAY_DELAY);
		return () => clearInterval(timer);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Left panel entrance animation
	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ delay: 0.1 });
			tl.from(leftEyebrowRef.current, {
				opacity: 0,
				y: 16,
				duration: 0.6,
				ease: "power3.out",
			})
				.from(
					leftHeadingRef.current,
					{
						opacity: 0,
						y: 28,
						duration: 0.75,
						ease: "power3.out",
					},
					"-=0.4",
				)
				.from(
					leftBodyRef.current,
					{
						opacity: 0,
						y: 20,
						duration: 0.6,
						ease: "power3.out",
					},
					"-=0.45",
				)
				.from(
					leftBtnsRef.current,
					{
						opacity: 0,
						y: 16,
						duration: 0.55,
						ease: "power3.out",
					},
					"-=0.38",
				);
		}, leftPanelRef);
		return () => ctx.revert();
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
				{/* ── Left Panel ── */}
				<div
					ref={leftPanelRef}
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
					<p
						ref={leftEyebrowRef}
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

					<h1
						ref={leftHeadingRef}
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
						Skin Rituals,
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

					<p
						ref={leftBodyRef}
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

					<div
						ref={leftBtnsRef}
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

				{/* ── Right Panel — Carousel ── */}
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
						position: "relative",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						overflow: "hidden",
						minHeight: isMobile
							? "360px"
							: isTablet
								? "420px"
								: "520px",
					}}
				>
					{/* Soft color wash */}
					<div
						ref={washRef}
						style={{
							position: "absolute",
							inset: 0,
							pointerEvents: "none",
							background: `radial-gradient(ellipse 55% 55% at 50% 46%, rgba(${soaps[0].washColor}, 0.13) 0%, transparent 70%)`,
						}}
					/>

					{/* Slides */}
					{soaps.map((soap, idx) => (
						<div
							key={soap.name}
							ref={(el) => (slideRefs.current[idx] = el)}
							style={{
								position: "absolute",
								inset: 0,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								opacity: idx === 0 ? 1 : 0,
								pointerEvents:
									idx === 0 ? "all" : "none",
							}}
						>
							<div
								style={{
									width: imgSize,
									height: imgSize,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0,
									overflow: "hidden",
								}}
							>
								<img
									ref={(el) =>
										(imgRefs.current[idx] = el)
									}
									src={soap.img}
									alt={soap.name}
									style={{
										width: "100%",
										height: "100%",
										objectFit: "contain",
										// filter: "drop-shadow(0 16px 40px rgba(26,26,24,0.15))",
										willChange:
											"transform, opacity",
										display: "block",
										backfaceVisibility: "hidden",
										transform: "translateZ(0)",
									}}
								/>
							</div>

							<span
								ref={(el) =>
									(nameRefs.current[idx] = el)
								}
								style={{
									fontFamily: "var(--font-display)",
									fontSize: isMobile
										? "18px"
										: "22px",
									fontWeight: 400,
									letterSpacing: "0.32em",
									color: "var(--color-text-dark)",
									marginTop: "28px",
									textTransform: "uppercase",
									display: "block",
									textAlign: "center",
									paddingRight: "0.32em",
								}}
							>
								{soap.name}
							</span>

							<span
								ref={(el) =>
									(categoryRefs.current[idx] = el)
								}
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "9px",
									fontWeight: 500,
									letterSpacing: "0.28em",
									color: "var(--color-gold)",
									marginTop: "8px",
									textTransform: "uppercase",
									display: "block",
									textAlign: "center",
									paddingRight: "0.28em",
								}}
							>
								{soap.category}
							</span>

							{soap.bestseller && (
								<div
									style={{
										position: "absolute",
										top: "20px",
										right: "24px",
										backgroundColor:
											"var(--color-badge-bg)",
										color: "var(--color-badge-text)",
										fontSize: "9px",
										letterSpacing: "0.16em",
										fontWeight: 600,
										padding: "5px 10px",
									}}
								>
									BESTSELLER
								</div>
							)}
						</div>
					))}

					{/* Prev Arrow */}
					<button
						onClick={() =>
							goTo(
								(currentRef.current -
									1 +
									soaps.length) %
									soaps.length,
								-1,
							)
						}
						aria-label="Previous"
						style={{
							position: "absolute",
							left: "16px",
							top: "50%",
							transform: "translateY(-50%)",
							background: "none",
							border: "none",
							cursor: "pointer",
							opacity: 0.45,
							padding: 0,
							transition: "opacity 0.2s",
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.opacity = "1")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.opacity = "0.45")
						}
					>
						<svg
							width="40"
							height="40"
							viewBox="0 0 40 40"
							fill="none"
							stroke="var(--color-text-dark)"
							strokeWidth="0.8"
						>
							<line x1="25" y1="10" x2="15" y2="20" />
							<line x1="15" y1="20" x2="25" y2="30" />
						</svg>
					</button>

					{/* Next Arrow */}
					<button
						onClick={() =>
							goTo(
								(currentRef.current + 1) % soaps.length,
								1,
							)
						}
						aria-label="Next"
						style={{
							position: "absolute",
							right: "16px",
							top: "50%",
							transform: "translateY(-50%)",
							background: "none",
							border: "none",
							cursor: "pointer",
							opacity: 0.45,
							padding: 0,
							transition: "opacity 0.2s",
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.opacity = "1")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.opacity = "0.45")
						}
					>
						<svg
							width="40"
							height="40"
							viewBox="0 0 40 40"
							fill="none"
							stroke="var(--color-text-dark)"
							strokeWidth="0.8"
						>
							<line x1="15" y1="10" x2="25" y2="20" />
							<line x1="25" y1="20" x2="15" y2="30" />
						</svg>
					</button>

					{/* Dot indicators */}
					<div
						style={{
							position: "absolute",
							bottom: "22px",
							left: "50%",
							transform: "translateX(-50%)",
							display: "flex",
							gap: "8px",
						}}
					>
						{soaps.map((_, i) => (
							<div
								key={i}
								onClick={() =>
									goTo(
										i,
										i > currentRef.current
											? 1
											: -1,
									)
								}
								style={{
									height: "1px",
									width:
										i === current
											? "32px"
											: "18px",
									background:
										i === current
											? "var(--color-gold)"
											: "var(--color-divider)",
									cursor: "pointer",
									transition:
										"width 0.35s ease, background 0.35s ease",
								}}
							/>
						))}
					</div>

					{/* Counter */}
					<div
						style={{
							position: "absolute",
							bottom: "20px",
							right: "24px",
							fontSize: "10px",
							letterSpacing: "0.22em",
							color: "var(--color-text-muted)",
						}}
					>
						{String(current + 1).padStart(2, "0")} /{" "}
						{String(soaps.length).padStart(2, "0")}
					</div>
				</div>
			</div>

			{/* ── Ticker Bar ── */}
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
