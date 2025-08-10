
// Component to display a restriction message when the device is in an unsupported orientation
export default function BlockMobileTablet() {
    return (
        <div className="block-visible-desktop-mobile-portrait">
            <div className="d-flex justify-content-center align-items-center text-center text-white p-4 flex-column h-100 w-100">
                <h2 className="mb-3 text-danger">Access Restricted</h2>
                <p className="lead text-light">
                    This content is only available on desktop, tablet and on mobile devices in portrait mode.
                    Please rotate your device to portrait orientation to continue.
                </p>
            </div>
        </div>
    );
}
