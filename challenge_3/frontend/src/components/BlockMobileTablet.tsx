export default function BlockMobileTablet() {
    return (
        <div className="block-visible-desktop-mobile-portrait">
            <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-center text-white p-4">
                <div>
                    <h2 className="mb-3 text-danger">Access Restricted</h2>
                    <p className="lead text-light">
                        This content is only available on desktop and on mobile/tablet devices in portrait mode.
                        Please rotate your device to portrait orientation to continue.
                    </p>
                </div>
            </div>
        </div>
    );
}
