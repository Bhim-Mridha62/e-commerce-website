export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-10">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Privacy Policy
                </h1>

                <p className="text-sm text-gray-500 mb-6">
                    Last updated: December 2025
                </p>

                <p className="mb-6 text-gray-700">
                    Welcome to <strong>MK GZest</strong> (https://mkgzest.vercel.app).
                    Your privacy is very important to us. This Privacy Policy explains
                    how we collect, use, and protect your information when you use our
                    e-commerce platform.
                </p>

                <section className="space-y-6 text-gray-700">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            1. Information We Collect
                        </h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>
                                <strong>Personal Information:</strong> Name, email, phone
                                number, shipping address, and payment details when placing
                                orders.
                            </li>
                            <li>
                                <strong>Usage Data:</strong> IP address, browser type, device
                                information, and pages visited.
                            </li>
                            <li>
                                <strong>Cookies:</strong> Used to improve user experience and
                                analyze traffic.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            2. How We Use Your Information
                        </h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Process and deliver orders</li>
                            <li>Improve products and services</li>
                            <li>Provide customer support</li>
                            <li>Send order updates and promotions (optional)</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            3. Google AdSense & Cookies
                        </h2>
                        <p>
                            We use Google AdSense to display advertisements. Google may use
                            cookies (including the DoubleClick cookie) to show relevant ads.
                        </p>
                        <p className="mt-2">
                            You can opt out of personalized ads at:
                            <br />
                            <a
                                href="https://adssettings.google.com"
                                className="text-blue-600 underline"
                                target="_blank"
                            >
                                https://adssettings.google.com
                            </a>
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            4. Data Sharing
                        </h2>
                        <p>
                            We do not sell your personal data. Information may be shared only
                            with trusted partners such as payment gateways, shipping services,
                            and analytics providers.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            5. Data Security
                        </h2>
                        <p>
                            We use industry-standard security measures, but no online system
                            is completely secure.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            6. Children’s Information
                        </h2>
                        <p>
                            MK GZest does not knowingly collect data from children under the
                            age of 13.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            7. Contact Us
                        </h2>
                        <p>
                            Email:{" "}
                            <a
                                href="mailto:support@mkgzest.com"
                                className="text-blue-600 underline"
                            >
                                support@mkgzest.com
                            </a>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
