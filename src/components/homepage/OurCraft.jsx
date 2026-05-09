import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurCraft() {
	const sectionRef = useRef(null);
	const statRef = useRef(null);
	const cardRefs = useRef([]);
	const eyebrowRef = useRef(null);
	const headingRef = useRef(null);
	const bodyRef = useRef(null);
	const stepRefs = useRef([]);
	const btnRef = useRef(null);
	const imgBgRef = useRef(null);
	const cardWrapRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const trigger = {
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 78%",
					once: true,
				},
			};

			// BG image fades up subtly
			gsap.from(imgBgRef.current, {
				opacity: 0,
				scale: 1.06,
				duration: 1.2,
				ease: "power2.out",
				...trigger,
			});

			// Content card rises
			gsap.from(cardWrapRef.current, {
				opacity: 0,
				y: 32,
				duration: 0.8,
				ease: "power3.out",
				delay: 0.2,
				...trigger,
			});

			// Stat number counts up
			const obj = { val: 0 };
			gsap.to(obj, {
				val: 100,
				duration: 1.4,
				ease: "power2.out",
				delay: 0.35,
				scrollTrigger: trigger.scrollTrigger,
				onUpdate() {
					if (statRef.current)
						statRef.current.textContent =
							Math.round(obj.val) + "%";
				},
			});

			// Feature cards stagger in
			gsap.from(cardRefs.current, {
				opacity: 0,
				y: 20,
				duration: 0.55,
				ease: "power3.out",
				stagger: 0.12,
				delay: 0.5,
				...trigger,
			});

			// Right panel — eyebrow + heading + body
			gsap.from(
				[eyebrowRef.current, headingRef.current, bodyRef.current],
				{
					opacity: 0,
					y: 24,
					duration: 0.7,
					ease: "power3.out",
					stagger: 0.13,
					delay: 0.15,
					...trigger,
				},
			);

			// Steps stagger
			gsap.from(stepRefs.current, {
				opacity: 0,
				x: -16,
				duration: 0.5,
				ease: "power3.out",
				stagger: 0.1,
				delay: 0.45,
				...trigger,
			});

			// Button fades up last
			gsap.from(btnRef.current, {
				opacity: 0,
				y: 12,
				duration: 0.5,
				ease: "power2.out",
				delay: 0.9,
				...trigger,
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			style={{ fontFamily: "var(--font-body)" }}
			className="grid md:grid-cols-2"
		>
			{/* ── Left Panel ── */}
			<div
				className="relative overflow-hidden grid grid-rows-[80px_auto_80px] md:grid-rows-[1fr_auto_1fr] min-h-[480px] md:min-h-[520px] border-b md:border-b-0 md:border-r"
				style={{ borderColor: "var(--color-divider)" }}
			>
				{/* Background image */}
				<div
					ref={imgBgRef}
					className="absolute inset-0 z-0"
					style={{
						backgroundImage: "url('/bg.png')",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>

				{/* Top spacer */}
				<div className="z-10" />

				{/* Floating content card */}
				<div
					ref={cardWrapRef}
					className="z-10 mx-4 sm:mx-8 md:mx-28 flex flex-col items-center justify-center py-8 px-6 sm:px-10"
					style={{ backgroundColor: "var(--color-bg-primary)" }}
				>
					<p
						ref={statRef}
						className="leading-none mb-1"
						style={{
							fontFamily: "var(--font-display)",
							fontSize: "clamp(56px, 10vw, 80px)",
							fontWeight: 300,
							color: "var(--color-text-dark)",
							letterSpacing: "-2px",
						}}
					>
						0%
					</p>
					<p
						className="mb-8"
						style={{
							fontSize: "11px",
							fontWeight: 500,
							letterSpacing: "0.22em",
							color: "var(--color-text-muted)",
							textTransform: "uppercase",
						}}
					>
						Natural Ingredients
					</p>

					<div className="flex flex-col gap-3 w-full max-w-xs">
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
										<circle
											cx="12"
											cy="12"
											r="10"
										/>
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
						].map((item, i) => (
							<div
								key={item.label}
								ref={(el) => (cardRefs.current[i] = el)}
								className="flex items-center gap-3 rounded-sm"
								style={{
									background: "#fff",
									border: "1px solid var(--color-divider)",
									padding: "14px 18px",
								}}
							>
								<div
									className="shrink-0 flex items-center justify-center rounded-full"
									style={{
										width: "32px",
										height: "32px",
										background:
											"var(--color-bg-secondary)",
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

				{/* Bottom spacer */}
				<div className="z-10" />
			</div>

			{/* ── Right Panel ── */}
			<div
				className="flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 py-12 sm:px-10 sm:py-14 md:px-[52px] md:py-[56px]"
				style={{ backgroundColor: "var(--color-bg-secondary)" }}
			>
				<p
					ref={eyebrowRef}
					className="mb-4"
					style={{
						fontSize: "11px",
						fontWeight: 500,
						letterSpacing: "0.22em",
						color: "var(--color-gold)",
						textTransform: "uppercase",
					}}
				>
					Our Craft
				</p>

				<h2
					ref={headingRef}
					className="mb-5"
					style={{
						fontFamily: "var(--font-display)",
						fontSize: "clamp(34px, 6vw, 44px)",
						fontWeight: 300,
						color: "var(--color-text-dark)",
						lineHeight: 1.1,
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
					ref={bodyRef}
					className="mb-8"
					style={{
						fontSize: "14px",
						lineHeight: 1.75,
						color: "var(--color-text-muted)",
						fontWeight: 300,
						maxWidth: "340px",
					}}
				>
					Every MamaMia bar is cold-processed by hand — a method
					that keeps the natural glycerin and nutrients alive in
					the soap, giving your skin what it truly deserves.
				</p>

				<div className="flex flex-col gap-5 mb-9 w-full max-w-sm md:max-w-none">
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
					].map((step, i) => (
						<div
							key={step.n}
							ref={(el) => (stepRefs.current[i] = el)}
							className="flex items-start gap-4 text-left"
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
					ref={btnRef}
					className="w-full md:w-auto transition-opacity duration-200 hover:opacity-80"
					style={{
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
					}}
				>
					Read Our Story
				</button>
			</div>
		</section>
	);
}
