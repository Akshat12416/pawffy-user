import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold mb-8 text-slate-800 border-b pb-4">ThePawffy Terms and Conditions</h1>
        <div className="prose max-w-none text-left space-y-4 text-gray-700">
          <p className="font-semibold text-gray-900">Effective Date: October 1, 2026</p>
          <p>These Terms and Conditions ("Terms") govern your access to and use of ThePawffy website, mobile applications, marketplace, communications, features, products, and services.</p>
          <p>ThePawffy is operated by Ganapati & Rani Investment LLC, doing business as ThePawffy ("ThePawffy," "Company," "we," "us," or "our").</p>
          <p>By creating an account, accessing or using ThePawffy, purchasing goods or services through the platform, registering as a vendor or service provider, or otherwise using our services, you agree to these Terms and our Privacy Policy.</p>
          <p>If you do not agree with these Terms, do not use ThePawffy.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">1. Eligibility</h2>
          <p>You must be at least 18 years old and legally capable of entering into a binding agreement to create an account, make purchases, sell products, provide services, or register as a vendor on ThePawffy.</p>
          <p>By using ThePawffy, you represent that the information you provide is accurate and that you have authority to agree to these Terms.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">2. User Accounts</h2>
          <p>Certain features may require an account. You are responsible for:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Providing accurate and current information.</li>
            <li>Maintaining the confidentiality of your login credentials.</li>
            <li>Protecting access to your phone number and email account.</li>
            <li>All activity conducted through your account.</li>
            <li>Promptly notifying ThePawffy of suspected unauthorized access.</li>
          </ul>
          <p>You may not create accounts using false identities or impersonate another person, organization, business, rescue organization, veterinary provider, or vendor.</p>
          <p>ThePawffy may suspend, restrict, or terminate accounts that violate these Terms, create security concerns, engage in fraud or abuse, or otherwise pose a risk to the platform or its users.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">3. ThePawffy Platform</h2>
          <p>ThePawffy may provide features relating to pets, pet owners, businesses, products, services, vendors, community interactions, account management, communications, and other pet-related activities.</p>
          <p>Features may change, be added, restricted, suspended, or discontinued at any time.</p>
          <p>Unless specifically stated otherwise, ThePawffy provides a technology platform connecting users with independent vendors and service providers.</p>
          <p>ThePawffy is not automatically the seller, manufacturer, veterinarian, groomer, trainer, boarding provider, transportation provider, insurer, rescue organization, or other service provider merely because a transaction or interaction occurs through the platform.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">4. Vendors and Service Providers</h2>
          <p>A "Vendor" includes any person, business, professional, merchant, contractor, organization, or service provider that offers goods or services through ThePawffy.</p>
          <p>By registering as a Vendor, you represent and warrant that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>You have authority to conduct the business represented.</li>
            <li>All information you provide is accurate and current.</li>
            <li>You possess all licenses, permits, certifications, registrations, insurance, and approvals required by applicable law.</li>
            <li>Your products and services are lawful and accurately described.</li>
            <li>Your pricing, availability, qualifications, policies, and other listing information are accurate.</li>
            <li>You will comply with all applicable consumer-protection, animal-welfare, tax, employment, privacy, advertising, and professional requirements.</li>
            <li>You will not make misleading, deceptive, or unsupported claims.</li>
            <li>You will provide services with reasonable skill, care, professionalism, and safety.</li>
            <li>You are responsible for the conduct of your employees, contractors, representatives, and agents.</li>
          </ul>
          <p>ThePawffy may request documentation verifying a Vendor's identity, business registration, insurance, credentials, licensing, or other qualifications. Failure to provide requested documentation may result in suspension or removal.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">5. Independent Vendor Relationship</h2>
          <p>Vendors are independent businesses and are not employees, agents, representatives, partners, franchisees, or joint venturers of ThePawffy.</p>
          <p>Nothing in these Terms creates an employment, agency, partnership, fiduciary, or joint-venture relationship between ThePawffy and any Vendor.</p>
          <p>Vendors control the manner in which they perform their services, subject to applicable laws and platform requirements.</p>
          <p>Vendors are solely responsible for their employees, contractors, payroll, insurance, benefits, taxes, licenses, and regulatory obligations.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">6. Vendor Products and Services</h2>
          <p>Vendors are responsible for all products or services they advertise, sell, provide, deliver, or arrange through ThePawffy.</p>
          <p>ThePawffy does not independently guarantee:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Product quality.</li>
            <li>Vendor qualifications.</li>
            <li>Service results.</li>
            <li>Availability.</li>
            <li>Pricing.</li>
            <li>Safety.</li>
            <li>Accuracy of Vendor representations.</li>
            <li>Compliance with professional standards.</li>
            <li>Suitability of a product or service for a particular pet.</li>
          </ul>
          <p>ThePawffy may remove listings or Vendors when appropriate but is not obligated to independently investigate every Vendor or transaction.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">7. Orders, Purchases, and Payments</h2>
          <p>Users may have the ability to purchase goods or services through ThePawffy.</p>
          <p>Prices, taxes, service charges, delivery charges, commissions, platform fees, and other applicable charges may be displayed before checkout.</p>
          <p>Payments may be processed by third-party payment processors. By submitting payment information, you authorize the applicable charges and represent that you are authorized to use the selected payment method.</p>
          <p>ThePawffy does not control the internal operations, security, availability, or policies of third-party payment processors.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">8. Vendor Fees and Commissions</h2>
          <p>ThePawffy may charge Vendors subscription fees, transaction fees, commissions, advertising fees, processing fees, service fees, or other charges.</p>
          <p>Applicable fees may be described in the Vendor dashboard, onboarding materials, order details, separate Vendor agreement, or current fee schedule.</p>
          <p>Unless otherwise required by law, applicable platform fees may be deducted from payments otherwise payable to Vendors.</p>
          <p>ThePawffy may change its fee structure prospectively upon reasonable notice.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">9. Taxes</h2>
          <p>Vendors are responsible for determining and satisfying their own tax obligations, including income, sales, use, franchise, employment, and other applicable taxes unless ThePawffy is legally required to collect or remit a particular tax.</p>
          <p>Users are responsible for taxes applicable to their purchases where permitted by law.</p>
          <p>Nothing provided by ThePawffy constitutes tax advice.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">10. Cancellations, Refunds, and Chargebacks</h2>
          <p>Cancellation and refund eligibility may depend on:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>The product or service purchased.</li>
            <li>Vendor policies.</li>
            <li>Timing of cancellation.</li>
            <li>Whether the product was delivered.</li>
            <li>Whether services were performed.</li>
            <li>Applicable law.</li>
          </ul>
          <p>Vendor-specific cancellation or refund terms may be displayed during booking or checkout.</p>
          <p>ThePawffy may investigate disputed transactions, suspected fraud, excessive chargebacks, or misuse of refund procedures.</p>
          <p>ThePawffy may recover amounts from a Vendor when a refund, chargeback, adjustment, penalty, or reversal results from the Vendor's conduct, products, services, representations, or failure to fulfill an order.</p>
          <p>Nothing in these Terms eliminates rights that cannot legally be waived under applicable consumer-protection law.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">11. Pet Health and Veterinary Disclaimer</h2>
          <p>Content available through ThePawffy is provided for general informational purposes unless expressly provided by a properly licensed professional acting within the scope of a professional relationship.</p>
          <p>ThePawffy does not provide veterinary diagnosis, veterinary treatment, medical advice, or emergency veterinary services merely by operating the platform.</p>
          <p>Do not rely on general platform content as a substitute for professional veterinary care. If a pet appears to be experiencing a medical emergency, contact a veterinarian or emergency veterinary facility immediately.</p>
          <p>Users remain responsible for decisions concerning the health, safety, treatment, transportation, feeding, housing, and care of their animals.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">12. Vendor Professional Advice</h2>
          <p>A Vendor offering veterinary, behavioral, training, grooming, nutritional, boarding, transportation, or other professional pet-related services is responsible for determining whether the Vendor may legally provide those services.</p>
          <p>Any professional relationship is between the user and the applicable Vendor.</p>
          <p>ThePawffy does not guarantee any particular outcome from a Vendor's recommendations or services.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">13. User Content</h2>
          <p>Users and Vendors may be permitted to submit photographs, videos, reviews, listings, descriptions, comments, messages, pet information, logos, or other material ("User Content").</p>
          <p>You retain ownership of your User Content.</p>
          <p>By submitting User Content to ThePawffy, you grant ThePawffy a non-exclusive, worldwide, royalty-free license to host, store, reproduce, display, distribute, format, and otherwise use that content as reasonably necessary to operate, promote, secure, and improve the platform.</p>
          <p>You represent that you have the rights necessary to submit the content.</p>
          <p>You may not upload content that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Infringes intellectual-property rights.</li>
            <li>Violates privacy or publicity rights.</li>
            <li>Is fraudulent or deceptive.</li>
            <li>Contains unlawful threats or harassment.</li>
            <li>Promotes illegal conduct.</li>
            <li>Contains malicious software.</li>
            <li>Misrepresents an animal, product, service, business, or professional qualification.</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 text-gray-900">14. Reviews and Ratings</h2>
          <p>Users may be permitted to review Vendors, products, or services. Reviews must reflect genuine experiences.</p>
          <p>The following are prohibited:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Fake reviews.</li>
            <li>Paid reviews that are not properly disclosed.</li>
            <li>Reviews submitted to manipulate ratings.</li>
            <li>Threatening a Vendor or user to obtain compensation.</li>
            <li>Reviews containing unlawful or irrelevant personal information.</li>
          </ul>
          <p>ThePawffy may moderate or remove reviews that violate these Terms.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">15. Prohibited Conduct</h2>
          <p>You may not:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use ThePawffy for illegal activity.</li>
            <li>Commit fraud or payment abuse.</li>
            <li>Misrepresent your identity or qualifications.</li>
            <li>Attempt unauthorized access to accounts or systems.</li>
            <li>Scrape or harvest data without authorization.</li>
            <li>Introduce malware or harmful code.</li>
            <li>Interfere with platform operation.</li>
            <li>Circumvent security controls.</li>
            <li>Abuse promotions, refunds, reviews, or referral programs.</li>
            <li>Sell prohibited, counterfeit, stolen, unsafe, or illegal products.</li>
            <li>Use the platform to facilitate animal cruelty, neglect, illegal breeding, illegal animal sales, or other unlawful conduct.</li>
            <li>Harass, threaten, exploit, or discriminate against another user.</li>
            <li>Use another person's personal information without authorization.</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 text-gray-900">16. Intellectual Property</h2>
          <p>ThePawffy and its software, trademarks, logos, designs, graphics, interfaces, databases, text, and other proprietary materials are owned by or licensed to Ganapati & Rani Investment LLC.</p>
          <p>These Terms do not transfer ownership of ThePawffy's intellectual property to you.</p>
          <p>You may not copy, reproduce, reverse engineer, distribute, resell, or commercially exploit proprietary ThePawffy materials except where expressly authorized.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">17. SMS Verification and Messaging Terms</h2>
          <p>ThePawffy SMS Program is operated by Ganapati & Rani Investment LLC dba ThePawffy.</p>
          <p>ThePawffy may send SMS messages for:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Account registration.</li>
            <li>Login authentication.</li>
            <li>One-time passcodes.</li>
            <li>Phone-number verification.</li>
            <li>Account recovery.</li>
            <li>Fraud prevention.</li>
            <li>Account security.</li>
          </ul>
          <p>These messages are transactional and security-related unless you separately provide consent to another type of messaging.</p>
          <p>Message frequency varies based on user activity. Message and data rates may apply.</p>
          <p>Consent to receive SMS messages is not a condition of purchasing goods or services except where a mobile verification message is reasonably required for account authentication or security.</p>
          <p>Reply STOP to opt out. Reply HELP for help.</p>
          <p>For additional assistance, contact ThePawffy through the support information provided on our website.</p>
          <p>Carriers are not liable for any delayed or undelivered messages. Wireless carriers are not responsible for the content of messages sent by ThePawffy. Delivery is subject to effective transmission by your mobile carrier and is not guaranteed.</p>
          <p>Your mobile number and SMS consent are handled in accordance with our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
          <p>ThePawffy does not sell or share SMS opt-in data or personal information with third parties for marketing purposes.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">18. Marketing Communications</h2>
          <p>Transactional account-security SMS consent does not constitute consent to receive marketing or promotional SMS communications.</p>
          <p>If ThePawffy introduces promotional SMS programs, users will be provided a separate opportunity to expressly consent where required.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">19. Electronic Communications</h2>
          <p>You consent to receive account-related electronic communications from ThePawffy, including communications through email, in-app notifications, or other permitted electronic channels.</p>
          <p>Certain communications may be legally required and may continue even if you disable optional notifications.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">20. Third-Party Services</h2>
          <p>ThePawffy may integrate with third-party services such as:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Payment processors.</li>
            <li>Mapping providers.</li>
            <li>Authentication providers.</li>
            <li>Communications providers.</li>
            <li>Analytics providers.</li>
            <li>Cloud-hosting providers.</li>
            <li>Vendor websites.</li>
          </ul>
          <p>Third-party products and services are governed by their own terms and privacy practices. ThePawffy is not responsible for third-party systems that it does not control.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">21. Platform Availability</h2>
          <p>We aim to provide reliable service but do not guarantee that ThePawffy will always be uninterrupted, secure, error-free, or available.</p>
          <p>Maintenance, technical failures, cybersecurity incidents, telecommunications failures, vendor outages, governmental actions, or circumstances beyond our reasonable control may affect service.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900 uppercase">22. Disclaimer of Warranties</h2>
          <p className="uppercase font-semibold">TO THE MAXIMUM EXTENT PERMITTED BY LAW, THEPAWFFY AND ITS SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE."</p>
          <p className="uppercase font-semibold">GANAPATI & RANI INVESTMENT LLC DISCLAIMS WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND OTHER WARRANTIES TO THE MAXIMUM EXTENT PERMITTED BY LAW.</p>
          <p className="uppercase font-semibold">WE DO NOT GUARANTEE THAT:</p>
          <ul className="list-disc pl-6 space-y-1 uppercase font-semibold">
            <li>EVERY VENDOR WILL MEET A USER'S EXPECTATIONS.</li>
            <li>EVERY LISTING WILL BE ACCURATE.</li>
            <li>EVERY SERVICE WILL PRODUCE A PARTICULAR RESULT.</li>
            <li>EVERY PRODUCT WILL BE SUITABLE FOR A PARTICULAR PET.</li>
            <li>THE PLATFORM WILL OPERATE WITHOUT INTERRUPTION OR ERROR.</li>
          </ul>
          <p>Nothing in this section excludes a warranty that cannot legally be excluded.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900 uppercase">23. Limitation of Liability</h2>
          <p className="uppercase font-semibold">TO THE MAXIMUM EXTENT PERMITTED BY LAW, GANAPATI & RANI INVESTMENT LLC, THEPAWFFY, AND THEIR OWNERS, OFFICERS, EMPLOYEES, CONTRACTORS, AND AFFILIATES WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM OR RELATED TO USE OF THE PLATFORM.</p>
          <p className="uppercase font-semibold">THIS INCLUDES, WHERE PERMITTED BY LAW, LOSS ARISING FROM:</p>
          <ul className="list-disc pl-6 space-y-1 uppercase font-semibold">
            <li>VENDOR CONDUCT.</li>
            <li>USER CONDUCT.</li>
            <li>PET INJURY.</li>
            <li>PROPERTY DAMAGE.</li>
            <li>LOST PROFITS.</li>
            <li>LOST DATA.</li>
            <li>SERVICE INTERRUPTION.</li>
            <li>THIRD-PARTY PRODUCTS OR SERVICES.</li>
            <li>UNAUTHORIZED ACCOUNT ACCESS.</li>
          </ul>
          <p className="uppercase font-semibold">TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMPANY'S AGGREGATE LIABILITY ARISING FROM THE SERVICES WILL NOT EXCEED THE GREATER OF: <br/>(A) THE AMOUNT YOU PAID DIRECTLY TO THEPAWFFY DURING THE SIX MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM; OR <br/>(B) $100.</p>
          <p>Some jurisdictions do not permit certain liability limitations, so portions of this section may not apply to you.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">24. Vendor Indemnification</h2>
          <p>To the extent permitted by law, Vendors agree to defend, indemnify, and hold harmless Ganapati & Rani Investment LLC, ThePawffy, and their owners, officers, employees, affiliates, and representatives from third-party claims, losses, damages, penalties, liabilities, and reasonable legal costs arising from:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>The Vendor's products.</li>
            <li>The Vendor's services.</li>
            <li>Injury caused by the Vendor.</li>
            <li>Vendor employees or contractors.</li>
            <li>Vendor misrepresentations.</li>
            <li>Regulatory violations.</li>
            <li>Failure to hold required licensing or insurance.</li>
            <li>Intellectual-property infringement.</li>
            <li>Taxes owed by the Vendor.</li>
            <li>Violation of these Terms.</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 text-gray-900">25. User Indemnification</h2>
          <p>To the extent permitted by law, users agree to indemnify and hold harmless ThePawffy from third-party claims arising from:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Their unlawful use of the platform.</li>
            <li>Fraudulent activity.</li>
            <li>Content they submit.</li>
            <li>Their violation of another person's rights.</li>
            <li>Their material violation of these Terms.</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 text-gray-900">26. Suspension and Termination</h2>
          <p>ThePawffy may suspend or terminate access where reasonably necessary because of:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Fraud.</li>
            <li>Safety concerns.</li>
            <li>Legal or regulatory requirements.</li>
            <li>Payment abuse.</li>
            <li>Repeated complaints.</li>
            <li>Material violations of these Terms.</li>
            <li>Threats to platform security.</li>
            <li>Vendor credential issues.</li>
            <li>Animal welfare concerns.</li>
          </ul>
          <p>Where appropriate, ThePawffy may investigate before taking action. Termination does not eliminate obligations that accrued before termination.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">27. Dispute Resolution</h2>
          <p>Before filing a formal legal claim, you agree to make a reasonable attempt to resolve the dispute by contacting ThePawffy.</p>
          <p>Either party may provide written notice describing the dispute and requested resolution. The parties will attempt in good faith to resolve the matter informally for at least 30 days before pursuing formal proceedings, except where emergency injunctive relief is reasonably necessary.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">28. Arbitration and Class Action Waiver — United States</h2>
          <p><strong>PLEASE READ THIS SECTION CAREFULLY.</strong></p>
          <p>Except for claims eligible for small-claims court or claims seeking appropriate injunctive relief concerning intellectual-property misuse or unauthorized system access, disputes arising from these Terms or use of ThePawffy will, to the extent permitted by law, be resolved through binding individual arbitration rather than a jury trial.</p>
          <p>Arbitration will be administered under applicable consumer or commercial arbitration rules depending on the nature of the dispute. Claims must be brought individually.</p>
          <p>To the extent permitted by law, you and Ganapati & Rani Investment LLC waive the right to participate in a class, collective, consolidated, or representative action.</p>
          <p>You may opt out of this arbitration provision by sending written notice to ThePawffy within 30 days after first accepting these Terms. Your notice must identify your account and clearly state that you are opting out of arbitration.</p>
          <p>This section does not prevent either party from bringing an eligible claim in small-claims court.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">29. Governing Law</h2>
          <p>These Terms are governed by the laws of the State of Texas, without regard to conflict-of-law rules, except where federal law or another jurisdiction's mandatory consumer law applies.</p>
          <p>For disputes not subject to arbitration, the parties consent to appropriate state or federal courts in Texas having lawful jurisdiction over the dispute.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">30. Changes to These Terms</h2>
          <p>ThePawffy may update these Terms from time to time. If changes are material, we may provide notice through the website, application, email, or other appropriate means.</p>
          <p>The updated Effective Date will appear at the top of these Terms. Your continued use of the services following an effective update constitutes acceptance to the extent permitted by law.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">31. Assignment</h2>
          <p>You may not assign your rights or obligations under these Terms without written authorization from ThePawffy. ThePawffy may assign these Terms in connection with a merger, acquisition, restructuring, sale of assets, financing, or similar business transaction.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">32. Severability</h2>
          <p>If any provision of these Terms is found invalid or unenforceable, the remaining provisions will continue in effect to the fullest extent permitted by law.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">33. No Waiver</h2>
          <p>Failure by ThePawffy to enforce a provision of these Terms does not waive our right to enforce it later.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">34. Entire Agreement</h2>
          <p>These Terms, together with our Privacy Policy and any additional terms expressly presented for a particular feature, transaction, Vendor program, or service, constitute the agreement governing use of ThePawffy.</p>
          <p>If Vendor-specific written terms conflict with these general Terms, the Vendor-specific terms control only as to the subject matter covered by those terms.</p>

          <h2 className="text-xl font-bold mt-6 text-gray-900">35. Contact Information</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-semibold text-gray-900">Ganapati & Rani Investment LLC dba ThePawffy</p>
            <p>Website: <a href="https://www.thepawffy.com" className="text-blue-600 hover:underline">https://www.thepawffy.com</a></p>
            <p>Support Email: <a href="mailto:SUPPORT@THEPAWFFY.COM" className="text-blue-600 hover:underline">SUPPORT@THEPAWFFY.COM</a></p>
            <p>Privacy Policy: <a href="/privacy-policy" className="text-blue-600 hover:underline">https://www.thepawffy.com/privacy-policy</a></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;
