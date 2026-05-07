import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
	"COLLECTIONS",
	"SKIN TYPE",
	"OUR STORY",
	"BUNDLES",
	"JOURNAL",
];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const update = () => setIsMobile(window.innerWidth < 768);
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	// Close menu on resize to desktop
	useEffect(() => {
		if (!isMobile) setMenuOpen(false);
	}, [isMobile]);

	return (
		<div style={{ position: "relative", zIndex: 50 }}>
			<nav
				style={{
					backgroundColor: "var(--color-bg-dark)",
					color: "var(--color-text-light)",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: isMobile ? "14px 20px" : "16px 32px",
					borderBottom: menuOpen
						? "1px solid rgba(245,240,232,0.08)"
						: "none",
				}}
			>
				{/* Logo */}
				<div style={{ flexShrink: 0 }}>
					<img
						src="/logo.png"
						alt="MamaMia"
						style={{ width: isMobile ? "80px" : "96px" }}
					/>
				</div>

				{/* Desktop Nav Links */}
				{!isMobile && (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "32px",
						}}
					>
						{navLinks.map((item) => (
							<a
								key={item}
								href="#"
								style={{
									color: "var(--color-text-light)",
									textDecoration: "none",
									fontSize: "11px",
									fontWeight: 500,
									letterSpacing: "0.18em",
									fontFamily: "var(--font-body)",
									opacity: 1,
									transition: "opacity 0.2s",
								}}
								onMouseEnter={(e) =>
									(e.currentTarget.style.opacity =
										"0.6")
								}
								onMouseLeave={(e) =>
									(e.currentTarget.style.opacity =
										"1")
								}
							>
								{item}
							</a>
						))}
					</div>
				)}

				{/* Right — Icons + Hamburger */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
					}}
				>
					{/* Search — always visible */}
					<IconBtn aria-label="Search">
						<Search size={15} strokeWidth={1.5} />
					</IconBtn>

					{/* User — hide on mobile */}
					{!isMobile && (
						<IconBtn aria-label="Account">
							<User size={15} strokeWidth={1.5} />
						</IconBtn>
					)}

					{/* Cart — always visible */}
					<IconBtn aria-label="Cart" badge={2}>
						<ShoppingBag size={15} strokeWidth={1.5} />
					</IconBtn>

					{/* Hamburger — mobile only */}
					{isMobile && (
						<button
							onClick={() => setMenuOpen((v) => !v)}
							aria-label={
								menuOpen ? "Close menu" : "Open menu"
							}
							style={{
								width: "36px",
								height: "36px",
								borderRadius: "50%",
								border: "1px solid rgba(245,240,232,0.3)",
								background: "transparent",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "var(--color-text-light)",
								cursor: "pointer",
								marginLeft: "4px",
								transition: "opacity 0.2s",
							}}
						>
							{menuOpen ? (
								<X size={15} strokeWidth={1.5} />
							) : (
								<Menu size={15} strokeWidth={1.5} />
							)}
						</button>
					)}
				</div>
			</nav>

			{/* Mobile Drawer */}
			{isMobile && menuOpen && (
				<div
					style={{
						position: "absolute",
						top: "100%",
						left: 0,
						right: 0,
						backgroundColor: "var(--color-bg-dark)",
						borderBottom: "1px solid rgba(245,240,232,0.1)",
						padding: "8px 0 24px",
						display: "flex",
						flexDirection: "column",
					}}
				>
					{navLinks.map((item, i) => (
						<a
							key={item}
							href="#"
							onClick={() => setMenuOpen(false)}
							style={{
								color: "var(--color-text-light)",
								textDecoration: "none",
								fontSize: "13px",
								fontWeight: 400,
								letterSpacing: "0.14em",
								fontFamily: "var(--font-body)",
								padding: "14px 24px",
								borderBottom:
									i < navLinks.length - 1
										? "1px solid rgba(245,240,232,0.06)"
										: "none",
								transition: "opacity 0.2s",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.opacity = "0.6")
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.opacity = "1")
							}
						>
							{item}
							<span
								style={{
									color: "var(--color-gold)",
									fontSize: "16px",
									lineHeight: 1,
								}}
							>
								→
							</span>
						</a>
					))}

					{/* Mobile Account link */}
					<a
						href="#"
						onClick={() => setMenuOpen(false)}
						style={{
							color: "rgba(245,240,232,0.5)",
							textDecoration: "none",
							fontSize: "11px",
							fontWeight: 500,
							letterSpacing: "0.18em",
							fontFamily: "var(--font-body)",
							padding: "16px 24px 0",
							display: "flex",
							alignItems: "center",
							gap: "8px",
						}}
					>
						<User size={13} strokeWidth={1.5} />
						MY ACCOUNT
					</a>
				</div>
			)}
		</div>
	);
}

/* Reusable icon button */
function IconBtn({ children, badge, "aria-label": label }) {
	return (
		<button
			aria-label={label}
			style={{
				width: "36px",
				height: "36px",
				borderRadius: "50%",
				border: "1px solid rgba(245,240,232,0.3)",
				background: "transparent",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				position: "relative",
				color: "var(--color-text-light)",
				cursor: "pointer",
				transition: "opacity 0.2s",
				flexShrink: 0,
			}}
			onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
			onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
		>
			{children}
			{badge && (
				<span
					style={{
						position: "absolute",
						top: "-4px",
						right: "-4px",
						width: "16px",
						height: "16px",
						borderRadius: "50%",
						backgroundColor: "var(--color-gold)",
						color: "#fff",
						fontSize: "9px",
						fontWeight: 700,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontFamily: "var(--font-body)",
					}}
				>
					{badge}
				</span>
			)}
		</button>
	);
}
