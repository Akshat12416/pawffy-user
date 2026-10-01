const fs = require('fs');

const createComponent = (name, content, addSmsLine = false) => {
  if (addSmsLine) {
    const smsLine = "Privacy. We collect, store, and process personal and business-related information in accordance with applicable privacy laws. Your use of the Platform signifies your consent to the collection and use of information as described. We do not sell, rent, or share your personal information, mobile phone number, or SMS opt-in data with any third parties or affiliates for marketing or promotional purposes.";
    // Insert it after the first header if possible, or just before Data Sharing
    if (content.includes('Data Sharing and Disclosure')) {
      content = content.replace('Data Sharing and Disclosure', 'Data Sharing and Disclosure\n\n' + smsLine + '\n\n');
    } else {
      content = content + '\n\n' + smsLine + '\n\n';
    }
  }
  
  // Format content as paragraph tags
  const paragraphs = content.split('\n').map(p => p.trim()).filter(p => p.length > 0).map(p => {
    const escaped = p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    return `<p className="mb-4 text-gray-700 leading-relaxed">${escaped}</p>`;
  });
  
  return `import React from 'react';
import { motion } from 'framer-motion';

const ${name} = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold mb-8 text-slate-800 border-b pb-4">${name.replace(/([A-Z])/g, ' $1').trim()}</h1>
        <div className="prose max-w-none text-left">
          ${paragraphs.join('\n          ')}
        </div>
      </motion.div>
    </div>
  );
};

export default ${name};
`;
};

const usersTerms = fs.readFileSync('Terms_and_Conditions_Users.txt', 'utf8');
const vendorsTerms = fs.readFileSync('Terms_and_Conditions_Vendors.txt', 'utf8');
const privacyPolicy = fs.readFileSync('PRIVACY_POLICY_USERS_AND_VENDORS.txt', 'utf8');

fs.writeFileSync('src/pages/TermsUsers.jsx', createComponent('TermsUsers', usersTerms));
fs.writeFileSync('src/pages/TermsVendors.jsx', createComponent('TermsVendors', vendorsTerms));
fs.writeFileSync('src/pages/PrivacyPolicy.jsx', createComponent('PrivacyPolicy', privacyPolicy, true));

console.log("Pages generated successfully!");
