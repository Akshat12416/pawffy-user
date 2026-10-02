import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold mb-8 text-slate-800 border-b pb-4">Privacy Policy</h1>
        <div className="prose max-w-none text-left space-y-4 text-gray-700">
          <p className="font-semibold text-gray-900">Effective Date: October 1, 2026</p>
          <p>
            This Privacy Policy explains how Ganapati & Rani Investment LLC, doing business as ThePawffy ("ThePawffy," "we," "us," or "our"), collects, uses, discloses, and protects information when you use ThePawffy websites, mobile applications, products, and services.
          </p>
          <p>
            By using ThePawffy, you acknowledge the practices described in this Privacy Policy.
          </p>
          
          <h2 className="text-xl font-bold mt-6 text-gray-900">1. Information We Collect</h2>
          <p>Depending on how you use ThePawffy, we may collect information including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Mobile telephone number</li>
            <li>Account username and profile information</li>
            <li>Authentication and account-security information</li>
            <li>Pet-related information that you choose to provide</li>
            <li>Photos, content, messages, or other information you voluntarily submit</li>
            <li>Device type, operating system, IP address, browser information, and application activity</li>
            <li>Login, account, and security logs</li>
            <li>Customer-support communications</li>
            <li>General location information derived from your device or IP address, where permitted</li>
            <li>Cookies, analytics information, and similar technical information</li>
          </ul>
          <p>We only collect information reasonably necessary to operate, secure, improve, and support ThePawffy and its users.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">2. How We Use Information</h2>
          <p>We may use information to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Create and administer user accounts</li>
            <li>Authenticate users and verify mobile phone numbers</li>
            <li>Send one-time passcodes and security verification messages</li>
            <li>Provide requested products, features, and services</li>
            <li>Protect accounts and prevent fraud, abuse, unauthorized access, and other security threats</li>
            <li>Respond to customer-support requests</li>
            <li>Maintain, troubleshoot, and improve ThePawffy</li>
            <li>Understand how users interact with our services</li>
            <li>Enforce our Terms of Service</li>
            <li>Comply with applicable laws, legal processes, and regulatory obligations</li>
            <li>Protect the rights, safety, and property of ThePawffy, our users, and others</li>
          </ul>
          <p>We do not use SMS verification consent as consent to receive unrelated marketing messages.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">3. SMS, Mobile Phone Numbers, and Messaging Consent</h2>
          <p>ThePawffy may request your mobile phone number for account registration, login verification, phone-number verification, account recovery, fraud prevention, authentication, and other account-security purposes.</p>
          <p>When you request a verification message, ThePawffy may send you an SMS containing a one-time passcode or other account-security information.</p>
          <p>Message frequency varies depending on your account activity and the number of verification requests you initiate. Message and data rates may apply.</p>
          <p>You may reply STOP to supported SMS messages to opt out and HELP for assistance.</p>
          
          <h3 className="text-lg font-semibold mt-4 text-gray-900">Mobile Information and SMS Consent</h3>
          <p>We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes.</p>
          <p>Mobile information, mobile telephone numbers, SMS opt-in data, and messaging consent will not be sold, rented, shared, or provided to third parties or affiliates for marketing or promotional purposes.</p>
          <p>SMS consent is specific to Ganapati & Rani Investment LLC dba ThePawffy and is not transferred to another business for that business's marketing or promotional use.</p>
          <p>We may use service providers, including telecommunications and technology providers, strictly as necessary to deliver requested messages, provide authentication services, maintain our systems, prevent fraud, or otherwise operate ThePawffy. Such providers may process information only as necessary to perform services for us and not for their own marketing purposes.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">4. When We May Disclose Information</h2>
          <p>We may disclose information in limited circumstances, including:</p>
          <p><strong>Service providers.</strong> We may provide information to vendors that perform services for us, such as hosting, authentication, cybersecurity, analytics, payment processing, communications, customer support, or infrastructure services.</p>
          <p><strong>Legal requirements.</strong> We may disclose information when we reasonably believe disclosure is required by law, subpoena, court order, governmental request, or other valid legal process.</p>
          <p><strong>Safety and security.</strong> We may disclose information when reasonably necessary to investigate fraud, security incidents, abuse, threats, violations of our agreements, or activity that may harm ThePawffy, our users, or others.</p>
          <p><strong>Business transactions.</strong> Information may be transferred as part of a merger, acquisition, restructuring, financing, sale of assets, bankruptcy, or similar corporate transaction, subject to applicable law.</p>
          <p>Nothing in this section permits SMS opt-in information or messaging consent to be provided to third parties or affiliates for their marketing or promotional purposes.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">5. Sale of Personal Information</h2>
          <p>ThePawffy does not sell mobile telephone numbers or SMS consent information.</p>
          <p>Where applicable privacy law defines "sale" or "sharing" more broadly than an ordinary monetary transaction, users may exercise any rights available to them under applicable law by contacting us using the information provided below.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">6. Cookies and Analytics</h2>
          <p>ThePawffy may use cookies, software development kits, analytics technologies, and similar tools to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Keep users signed in</li>
            <li>Maintain account security</li>
            <li>Remember preferences</li>
            <li>Diagnose technical problems</li>
            <li>Understand service usage</li>
            <li>Improve performance and functionality</li>
          </ul>
          <p>Your browser or device may allow you to limit certain cookies or tracking technologies. Disabling some technologies may affect how certain features work.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">7. Data Retention</h2>
          <p>We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including providing services, maintaining account and security records, resolving disputes, enforcing agreements, preventing fraud, and satisfying legal obligations.</p>
          <p>Retention periods may vary depending on the type of information and the reason it was collected.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">8. Data Security</h2>
          <p>We use reasonable administrative, technical, and organizational safeguards designed to protect information against unauthorized access, loss, misuse, alteration, or disclosure.</p>
          <p>However, no website, mobile application, database, network, or electronic transmission can be guaranteed to be completely secure. Users should protect their account credentials and immediately notify ThePawffy of suspected unauthorized account activity.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">9. Your Privacy Choices</h2>
          <p>Depending on your jurisdiction, you may have rights concerning your personal information, which may include the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Request access to certain personal information</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of certain information</li>
            <li>Obtain information about how your data is used</li>
            <li>Withdraw certain consent where applicable</li>
            <li>Exercise other rights provided under applicable privacy laws</li>
          </ul>
          <p>Some information may need to be retained when required by law or for legitimate security, fraud-prevention, recordkeeping, or contractual purposes.</p>
          <p>To submit a privacy request, contact us using the contact information below.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">10. Third-Party Websites and Services</h2>
          <p>ThePawffy may contain links to or integrations with third-party websites, applications, products, or services.</p>
          <p>We are not responsible for the privacy, security, content, or practices of third parties that we do not control. Users should review the privacy policies of third-party services before providing information to them.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">11. Children's Privacy</h2>
          <p>ThePawffy is not intended for children under the age of 13, and we do not knowingly collect personal information from children under 13 without legally required authorization.</p>
          <p>If we learn that personal information from a child under 13 was collected in violation of applicable law, we will take reasonable steps to delete it.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">12. United States Operations</h2>
          <p>ThePawffy is operated by Ganapati & Rani Investment LLC, a United States business. Information may be processed or stored in the United States and in other locations where our service providers operate, subject to applicable legal requirements.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">13. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time to reflect changes to our services, technology, legal requirements, or business practices.</p>
          <p>When changes are made, the updated policy will be posted on this page and the "Effective Date" will be revised.</p>
          <p>Your continued use of ThePawffy after an updated Privacy Policy becomes effective is subject to applicable law.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">14. Contact Us</h2>
          <p>For questions about this Privacy Policy, privacy requests, or ThePawffy's handling of personal information, contact:</p>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-semibold text-gray-900">Ganapati & Rani Investment LLC dba ThePawffy</p>
            <p>Website: <a href="https://www.thepawffy.com" className="text-blue-600 hover:underline">https://www.thepawffy.com</a></p>
            <p>Privacy/Support Email: <a href="mailto:support@thepawffy.com" className="text-blue-600 hover:underline">support@thepawffy.com</a></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
