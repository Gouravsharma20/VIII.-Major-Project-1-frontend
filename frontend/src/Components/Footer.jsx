export default function Footer() {
    return (
        <footer className="text-center mt-4 text-muted small">
                <p className="mb-1">
                    &copy; {new Date().getFullYear()} GiftMart. All rights reserved.
                </p>
                <p className="mb-0">
                    <a href="/terms" className="text-muted text-decoration-none me-3">
                        Terms
                    </a>
                    <a href="/privacy" className="text-muted text-decoration-none me-3">
                        Privacy
                    </a>
                    <a href="/contact" className="text-muted text-decoration-none">
                        Contact
                    </a>
                </p>
            </footer>
    )
}