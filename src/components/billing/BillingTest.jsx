import React from 'react';

const BillingTest = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Billing Test Page</h1>
      <p className="text-gray-600 mt-2">This is a test to verify billing routing works.</p>
      <div className="mt-4 p-4 bg-blue-100 rounded-lg">
        <p className="text-blue-800">If you can see this, the billing route is working!</p>
      </div>
    </div>
  );
};

export default BillingTest;
